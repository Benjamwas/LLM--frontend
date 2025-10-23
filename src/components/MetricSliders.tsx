"use client";
import React, { useState } from "react";
import { Box, TextField, Typography, Button } from "@mui/material";

interface MetricInputsProps {
  parameters?: {
    temperature?: number[];
    topP?: number[];
  };
  setParameters?: React.Dispatch<
    React.SetStateAction<{ temperature: number[]; topP: number[] }>
  >;
}

export default function MetricInputs({
  parameters = { temperature: [], topP: [] },
  setParameters = () => {},
}: MetricInputsProps) {
  const [tempInput, setTempInput] = useState<string>("");
  const [topPInput, setTopPInput] = useState<string>("");

  // Convert comma-separated string to number array
  const handleUpdateParameters = () => {
    const temps = tempInput
      .split(",")
      .map((v) => parseFloat(v.trim()))
      .filter((v) => !isNaN(v));

    const tops = topPInput
      .split(",")
      .map((v) => parseFloat(v.trim()))
      .filter((v) => !isNaN(v));

    setParameters({
      temperature: temps,
      topP: tops,
    });
  };

  return (
    <Box className="p-4 bg-white/5 rounded-xl shadow-md">
      <Typography variant="h6" color="primary" gutterBottom>
        Set Response Metrics
      </Typography>

      {/* Temperature input */}
      <Box className="mt-4">
        <Typography variant="subtitle2" gutterBottom>
          🌡 Temperature values (comma-separated)
        </Typography>
        <TextField
          fullWidth
          placeholder="e.g. 0.5, 0.7, 0.9"
          variant="outlined"
          size="small"
          value={tempInput}
          onChange={(e) => setTempInput(e.target.value)}
        />
      </Box>

      {/* Top-P input */}
      <Box className="mt-4">
        <Typography variant="subtitle2" gutterBottom>
          🎯 Top-P values (comma-separated)
        </Typography>
        <TextField
          fullWidth
          placeholder="e.g. 0.8, 0.9, 1.0"
          variant="outlined"
          size="small"
          value={topPInput}
          onChange={(e) => setTopPInput(e.target.value)}
        />
      </Box>

      {/* Update button */}
      <Button
        variant="contained"
        color="primary"
        className="mt-4"
        onClick={handleUpdateParameters}
      >
        Apply Metrics
      </Button>

      {/* Show parsed arrays */}
      {(parameters.temperature?.length ?? 0) > 0 && (
        <Typography variant="caption" className="block mt-2">
          ✅ Temp: {parameters.temperature?.join(", ") ?? ""} | Top-P:{" "}
          {parameters.topP?.join(", ") ?? ""}
        </Typography>
      )}
    </Box>
  );
}
