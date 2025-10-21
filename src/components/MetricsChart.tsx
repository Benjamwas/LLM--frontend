"use client";

import { useEffect, useState } from "react";
import * as Recharts from "recharts";

const {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} = Recharts;
import { motion } from "framer-motion";

// ✅ Type definitions
type MetricType = "all" | "temperature" | "topP" | "responseLength";

interface Averages {
  avgTemp: number;
  avgTopP: number;
  avgResponseLength: number;
}

interface ServerParameters {
  temperature?: number[];
  topP?: number[];
  [key: string]: any;
}

interface ServerExperiment {
  id: string;
  prompt: string;
  parameters?: ServerParameters;
  results?: string;
  createdAt: string;
  [key: string]: any;
}

interface ResultItem {
  response?: string;
  [key: string]: any;
}

interface ExperimentData {
  id: string;
  prompt: string;
  temperature: number;
  topP: number;
  responseLength: number;
  createdAt: string;
}

export default function MetricsChart(): JSX.Element {
  const [data, setData] = useState<ExperimentData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [metric, setMetric] = useState<MetricType>("all");
  const [averages, setAverages] = useState<Averages>({
    avgTemp: 0,
    avgTopP: 0,
    avgResponseLength: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch("http://localhost:3000/api/experiments");
        if (!res.ok) throw new Error("Failed to fetch experiments");
        const experiments = (await res.json()) as ServerExperiment[];

        const formatted: ExperimentData[] = experiments.map((exp: ServerExperiment) => {
          const parsedResults: ResultItem[] = JSON.parse(exp.results || "[]");
          const firstResult: ResultItem | undefined = parsedResults[0] || {};

          return {
            id: exp.id,
            prompt: exp.prompt.slice(0, 30) + "...",
            temperature: exp.parameters?.temperature?.[0] ?? 0.7,
            topP: exp.parameters?.topP?.[0] ?? 0.9,
            responseLength: firstResult?.response?.length || 0,
            createdAt: new Date(exp.createdAt).toLocaleDateString(),
          };
        });

        const avgTemp =
          formatted.reduce((sum, d) => sum + d.temperature, 0) / formatted.length || 0;
        const avgTopP =
          formatted.reduce((sum, d) => sum + d.topP, 0) / formatted.length || 0;
        const avgResponseLength =
          formatted.reduce((sum, d) => sum + d.responseLength, 0) / formatted.length || 0;

        setAverages({
          avgTemp: Number(avgTemp.toFixed(2)),
          avgTopP: Number(avgTopP.toFixed(2)),
          avgResponseLength: Math.round(avgResponseLength),
        });

        setData(formatted);
      } catch (err: any) {
        setError(err.message || "Error loading metrics");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderLines = () => {
    if (metric === "temperature")
      return <Line type="monotone" dataKey="temperature" stroke="#3b82f6" name="Temperature" />;
    if (metric === "topP")
      return <Line type="monotone" dataKey="topP" stroke="#10b981" name="Top P" />;
    if (metric === "responseLength")
      return (
        <Line type="monotone" dataKey="responseLength" stroke="#f59e0b" name="Response Length" />
      );
    return (
      <>
        <Line type="monotone" dataKey="temperature" stroke="#3b82f6" name="Temperature" />
        <Line type="monotone" dataKey="topP" stroke="#10b981" name="Top P" />
        <Line type="monotone" dataKey="responseLength" stroke="#f59e0b" name="Response Length" />
      </>
    );
  };

  if (loading) return <p className="text-center text-blue-600">Loading metrics...</p>;
  if (error) return <p className="text-center text-red-500">⚠️ {error}</p>;
  if (!data.length) return <p className="text-center text-gray-500">No experiments yet.</p>;

  return (
    <div className="p-6 bg-white border border-blue-100 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">
        Experiment Metrics Overview
      </h2>

      {/* 🧮 Summary Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <motion.div className="p-4 bg-blue-50 border border-blue-100 rounded-xl text-center shadow-sm">
          <h3 className="text-sm font-semibold text-gray-500">Average Temperature</h3>
          <p className="text-2xl font-bold text-blue-600">{averages.avgTemp}</p>
        </motion.div>
        <motion.div className="p-4 bg-green-50 border border-green-100 rounded-xl text-center shadow-sm">
          <h3 className="text-sm font-semibold text-gray-500">Average Top P</h3>
          <p className="text-2xl font-bold text-green-600">{averages.avgTopP}</p>
        </motion.div>
        <motion.div className="p-4 bg-yellow-50 border border-yellow-100 rounded-xl text-center shadow-sm">
          <h3 className="text-sm font-semibold text-gray-500">Avg. Response Length</h3>
          <p className="text-2xl font-bold text-yellow-600">{averages.avgResponseLength}</p>
        </motion.div>
      </div>

      {/* 📊 Filter */}
      <div className="flex justify-end mb-4">
        <select
          value={metric}
          onChange={(e) => setMetric(e.target.value as MetricType)}
          className="border border-blue-200 rounded-lg px-3 py-2 text-sm text-gray-600 focus:ring focus:ring-blue-100"
        >
          <option value="all">All Metrics</option>
          <option value="temperature">Temperature</option>
          <option value="topP">Top P</option>
          <option value="responseLength">Response Length</option>
        </select>
      </div>

      {/* 📈 Line Chart */}
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="createdAt" />
          <YAxis />
          <Tooltip />
          <Legend />
          {renderLines()}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
