"use client";
import { motion } from "framer-motion";
import { Typography } from "@mui/material";

export default function MetricProgress({ label, value }: { label: string; value: number }) {
  return (
    <div className="my-3">
      <Typography variant="body1" className="font-medium text-gray-700 mb-1">
        {label}: {(value * 100).toFixed(1)}%
      </Typography>
      <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          className="h-3 bg-primary"
          initial={{ width: 0 }}
          animate={{ width: `${value * 100}%` }}
          transition={{ duration: 0.8 }}
        />
      </div>
    </div>
  );
}
