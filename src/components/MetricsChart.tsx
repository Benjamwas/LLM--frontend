"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@mui/material";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

export default function MetricsPage() {
  const [metrics, setMetrics] = useState<any[]>([]);

  useEffect(() => {
    // Simulate mock data fetching
    const mockMetrics = [
      { name: "Experiment 1", coherence: 0.82, diversity: 0.65, accuracy: 0.76 },
      { name: "Experiment 2", coherence: 0.88, diversity: 0.69, accuracy: 0.82 },
      { name: "Experiment 3", coherence: 0.91, diversity: 0.72, accuracy: 0.85 },
      { name: "Experiment 4", coherence: 0.87, diversity: 0.68, accuracy: 0.81 },
    ];
    setMetrics(mockMetrics);
  }, []);

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold text-blue-600 text-center"
      >
        Model Performance Metrics
      </motion.h1>

      {/* Metrics Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Average Coherence", value: "0.87" },
          { label: "Average Diversity", value: "0.69" },
          { label: "Average Accuracy", value: "0.81" },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-xl shadow-md p-4 border border-blue-100 text-center"
          >
            <p className="text-gray-600 text-sm">{item.label}</p>
            <p className="text-2xl font-semibold text-blue-600">{item.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Bar Chart */}
      <Card className="rounded-xl border border-blue-100 shadow-md">
        <CardContent className="p-4">
          <h2 className="text-lg font-semibold text-blue-600 mb-3">Metric Comparison</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={metrics}>
              <XAxis dataKey="name" />
              <YAxis domain={[0, 1]} />
              <Tooltip />
              <Legend />
              <Bar dataKey="coherence" fill="#2563eb" />
              <Bar dataKey="diversity" fill="#60a5fa" />
              <Bar dataKey="accuracy" fill="#93c5fd" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Line Chart */}
      <Card className="rounded-xl border border-blue-100 shadow-md">
        <CardContent className="p-4">
          <h2 className="text-lg font-semibold text-blue-600 mb-3">Metric Trends Over Experiments</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={metrics}>
              <XAxis dataKey="name" />
              <YAxis domain={[0, 1]} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="coherence" stroke="#2563eb" strokeWidth={2} />
              <Line type="monotone" dataKey="diversity" stroke="#60a5fa" strokeWidth={2} />
              <Line type="monotone" dataKey="accuracy" stroke="#93c5fd" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
