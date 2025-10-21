// src/app/page.tsx
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import PromptCards from "@/components/PromptCards";
import MetricsSlider from "@/components/MetricSliders";
import ChatInput from "@/components/ChatInput";
import ResponseSection from "@/components/ReponseSection";
import ActionButtons from "@/components/ActionButtons";
import MetricsChart from "@/components/MetricsChart"; // ✅ fixed import

export default function HomePage() {
  const [prompt, setPrompt] = useState("");
  const [responses, setResponses] = useState<any[]>([]);
  const [newResponse, setNewResponse] = useState<any>(null);

  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/experiments");
        if (!res.ok) throw new Error("Failed to fetch responses");
        const data = await res.json();
        const formatted = data.map((exp: any) => ({
          id: exp.id,
          prompt: exp.prompt,
          results: JSON.parse(exp.results || "[]"),
          createdAt: exp.createdAt,
        }));
        setResponses(formatted);
      } catch (err) {
        console.error(err);
      }
    };
    fetchResponses();
  }, []);

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white text-gray-900">
      {/* Header */}
      <header className="p-4 text-center shadow-md bg-white/80 backdrop-blur-lg">
        <h1 className="text-2xl font-bold text-blue-600">
          LLM Experiment Dashboard
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Test and visualize mock LLM responses
        </p>
      </header>

      {/* Content */}
      <section className="flex-1 container mx-auto p-4 grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left Sidebar */}
        <aside className="lg:col-span-2 space-y-4">
          <PromptCards onSelectPrompt={setPrompt} />
          <MetricsSlider />
          <ActionButtons />
        </aside>

        {/* Right Side */}
        <section className="lg:col-span-3 flex flex-col justify-between space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1 overflow-y-auto rounded-2xl p-4 bg-white shadow-sm border border-gray-200"
          >
            {/* Responses */}
            {/* @ts-ignore */}
            <ResponseSection responses={responses} />

            {/* ✅ Metrics Chart visualization */}
            <div className="mt-6">
              <MetricsChart/>
            </div>
          </motion.div>

          {/* Chat Input */}
          <ChatInput
            prompt={prompt}
            setPrompt={setPrompt}
            setResponses={setResponses}
          />
        </section>
      </section>
    </main>
  );
}
