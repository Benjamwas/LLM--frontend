// src/components/MetricsSlider.tsx
"use client";

import { Slider } from "@mui/material";
import { useState } from "react";

export default function MetricsSlider() {
  const [temperature, setTemperature] = useState(0.7);
  const [topP, setTopP] = useState(0.9);

  return (
    <div className="bg-white p-4 rounded-xl shadow-md border border-blue-100 space-y-4">
      <h2 className="text-lg font-semibold text-blue-600">Set Metrics</h2>

      <div>
        <label className="text-sm font-medium text-gray-700">Temperature: {temperature.toFixed(2)}</label>
        <Slider
          value={temperature}
          min={0}
          max={1}
          step={0.01}
          onChange={(_, value) => setTemperature(value as number)}
          sx={{ color: "#1e90ff" }}
        />
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700">Top P: {topP.toFixed(2)}</label>
        <Slider
          value={topP}
          min={0}
          max={1}
          step={0.01}
          onChange={(_, value) => setTopP(value as number)}
          sx={{ color: "#1e90ff" }}
        />
      </div>
    </div>
  );
}
