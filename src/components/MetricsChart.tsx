"use client";
import { Card, CardContent, Typography } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { motion } from "framer-motion";

interface Metric {
  name: string;
  value: number;
}

export default function MetricsChart({ metrics }: { metrics: any }) {
  if (!metrics) return null;

  // Transform metrics object into array for chart
  const data: Metric[] = Object.keys(metrics).map((key) => ({
    name: key.replace(/([A-Z])/g, " $1").trim(), // e.g. "coherenceScore" → "coherence Score"
    value: metrics[key],
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-6"
    >
      <Card className="shadow-md">
        <CardContent>
          <Typography variant="h6" color="primary" gutterBottom>
            Experiment Metrics
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
              <XAxis dataKey="name" />
              <YAxis domain={[0, 1]} />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#1e90ff" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </motion.div>
  );
}
