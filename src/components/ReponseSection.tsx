"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface ResponseSectionProps {
  newResponse?: any;
}

export default function ResponseSection({ newResponse }: ResponseSectionProps) {
  const [responses, setResponses] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchResponses = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch("https://llm-qou7.onrender.com/api/experiments");
      if (!res.ok) throw new Error("Failed to fetch responses");

      const data = await res.json();
      const formatted = data.map((exp: any) => ({
        id: exp.id,
        prompt: exp.prompt,
        results: JSON.parse(exp.results || "[]"),
        createdAt: exp.createdAt,
      }));

      setResponses(formatted);
    } catch (err: any) {
      setError(err.message || "Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResponses();
    const interval = setInterval(fetchResponses, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (newResponse) {
      setResponses((prev) => [newResponse, ...prev]);
    }
  }, [newResponse]);

  if (loading && responses.length === 0)
    return (
      <p className="text-center text-blue-400 animate-pulse">
        Fetching AI responses...
      </p>
    );

  if (error)
    return (
      <p className="text-center text-red-500">
        ⚠️ {error} — Check if backend is active.
      </p>
    );

  if (!responses.length)
    return (
      <p className="text-center text-gray-500">
        No responses yet. Send a prompt to get started!
      </p>
    );

  return (
    <div className="space-y-8 mt-8">
      {responses.map((res, index) => (
        <motion.div
          key={res.id || index}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="p-6 bg-white/10 border border-gray-700 rounded-2xl shadow-md"
        >
          <h3 className="text-black font-semibold text-lg mb-3">
            {res.prompt}
          </h3>

          {res.results.length > 0 ? (
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {res.results.map((r: any, idx: number) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.02 }}
                  className="p-4 bg-black rounded-xl border border-gray-700 shadow-sm"
                >
                  <div className="flex justify-between items-center text-xs text-gray-400">
                    <span>
                      🌡 Temp:{" "}
                      <strong>
                        {r.parameters?.temperature?.toFixed(2) ?? "—"}
                      </strong>
                    </span>
                    <span>
                      🎯 Top-P:{" "}
                      <strong>{r.parameters?.topP?.toFixed(2) ?? "—"}</strong>
                    </span>
                  </div>

                  <p className="mt-3 text-gray-100 text-sm leading-relaxed">
                    {r.response || "No response text"}
                  </p>

                  {r.metrics && (
                    <div className="mt-3 text-xs text-gray-400 space-y-1">
                      <p>🧠 Coherence: {r.metrics?.coherenceScore?.toFixed(2) ?? "—"}</p>
                      <p>🎨 Diversity: {r.metrics?.diversityScore?.toFixed(2) ?? "—"}</p>
                      <p>📈 Fluency: {r.metrics?.fluencyScore?.toFixed(2) ?? "—"}</p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No variations found.</p>
          )}
        </motion.div>
      ))}
    </div>
  );
}
