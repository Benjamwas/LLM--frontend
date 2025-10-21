"use client";

import { Send } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

interface ChatInputProps {
  prompt: string;
  setPrompt: React.Dispatch<React.SetStateAction<string>>;
  setResponses: React.Dispatch<React.SetStateAction<any[]>>;
}

export default function ChatInput({ prompt, setPrompt, setResponses }: ChatInputProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSend = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("https://llm-qou7.onrender.com/api/generate-experiment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          parameters: { temperature: [0.7], topP: [0.9] },
        }),
      });

      if (!res.ok) throw new Error("Failed to generate experiment");

      const data = await res.json();

      const newExperiment = {
        id: data.id,
        prompt: data.prompt,
        results: JSON.parse(data.results || "[]"),
        createdAt: data.createdAt,
      };

      //  Update parent responses
      setResponses((prev: any[]) => [newExperiment, ...(prev || [])]);

      //  Clear input
      setPrompt("");
    } catch (err: any) {
      console.error("ChatInput error:", err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-full p-2 flex items-center shadow-md border border-blue-100"
    >
      <input
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Type your prompt..."
        className="flex-1 px-4 py-2 outline-none rounded-full text-gray-700"
      />
      <button
        onClick={handleSend}
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3 transition"
      >
        {loading ? "..." : <Send className="w-4 h-4" />}
      </button>
      {error && (
        <p className="ml-3 text-sm text-red-500 animate-pulse">{error}</p>
      )}
    </motion.div>
  );
}