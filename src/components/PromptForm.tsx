"use client";
import { useState } from "react";
import { Slider, Button, TextField, Typography } from "@mui/material";
import { motion } from "framer-motion";
import api from "@/lib/api";

export default function PromptForm({ onExperiment }: { onExperiment: (data: any) => void }) {
  const mockPrompts = [
    "Summarize the importance of renewable energy in one paragraph.",
    "Write a short motivational message about teamwork.",
    "Explain quantum computing in simple terms."
  ];

  const [prompt, setPrompt] = useState(mockPrompts[0]);
  const [temperature, setTemperature] = useState(0.5);
  const [topP, setTopP] = useState(0.9);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const { data } = await api.post("/generate-experiment", {
      prompt,
      parameters: { temperature: [temperature], topP: [topP] }
    });
    onExperiment(data);
    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 bg-white shadow-lg rounded-2xl w-full max-w-3xl mx-auto"
    >
      <Typography variant="h6" className="text-primary mb-2">
        Select a Mock Prompt
      </Typography>
      <TextField
        select
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        fullWidth
        SelectProps={{ native: true }}
        variant="outlined"
      >
        {mockPrompts.map((p) => (
          <option key={p}>{p}</option>
        ))}
      </TextField>

      <div className="mt-6">
        <Typography gutterBottom>Temperature: {temperature}</Typography>
        <Slider value={temperature} min={0} max={1} step={0.1} onChange={(_, val) => setTemperature(val as number)} />
      </div>

      <div className="mt-4">
        <Typography gutterBottom>Top-P: {topP}</Typography>
        <Slider value={topP} min={0} max={1} step={0.1} onChange={(_, val) => setTopP(val as number)} />
      </div>

      <Button
        variant="contained"
        color="primary"
        className="mt-6"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Running..." : "Generate Experiment"}
      </Button>
    </motion.div>
  );
}
