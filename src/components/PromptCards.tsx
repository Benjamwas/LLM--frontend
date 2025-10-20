// src/components/PromptCards.tsx
"use client";

import { motion } from "framer-motion";

const prompts = [
  {
    id: 1,
    title: "Renewable Energy",
    text: "Summarize the importance of renewable energy in one paragraph.",
  },
  {
    id: 2,
    title: "Teamwork Motivation",
    text: "Write a short motivational message about teamwork.",
  },
  {
    id: 3,
    title: "Quantum Computing",
    text: "Explain quantum computing in simple terms.",
  },
];

export default function PromptCards({ onSelectPrompt }: { onSelectPrompt: (p: string) => void }) {
  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold text-blue-600">Choose a Prompt</h2>
      <div className="grid gap-3">
        {prompts.map((p) => (
          <motion.div
            key={p.id}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelectPrompt(p.text)}
            className="cursor-pointer bg-white rounded-xl p-4 shadow-md hover:shadow-lg border border-blue-100 transition"
          >
            <h3 className="font-semibold text-gray-800">{p.title}</h3>
            <p className="text-sm text-gray-600 mt-1">{p.text}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
