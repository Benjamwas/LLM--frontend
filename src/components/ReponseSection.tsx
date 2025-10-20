"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface ResponseSectionProps {
  newResponse?: any; // Latest response from ChatInput
}

export default function ResponseSection({ newResponse }: ResponseSectionProps) {
  const [responses, setResponses] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch existing experiments from backend
  const fetchResponses = async () => {
    try {
      setLoading(true);
      setError(null);

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
    } catch (err: any) {
      setError(err.message || "Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  // Fetch once on mount
  useEffect(() => {
    fetchResponses();
  }, []);

  // Append newResponse from ChatInput instantly
  useEffect(() => {
    if (newResponse) {
      setResponses((prev) => [newResponse, ...prev]);
    }
  }, [newResponse]);

  // UI States
  if (loading) {
    return <p className="text-center text-blue-600 animate-pulse">Fetching responses...</p>;
  }

  if (error) {
    return (
      <p className="text-center text-red-500">
        ⚠️ {error} — check if the backend is running.
      </p>
    );
  }

  if (!responses.length) {
    return <p className="text-center text-gray-500">No responses yet. Try sending a prompt!</p>;
  }

  return (
    <div className="space-y-4 mt-6">
      {responses.map((res, index) => (
        <motion.div
          key={res.id || index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-blue-50 border border-blue-100 rounded-xl shadow-sm"
        >
          <h3 className="text-blue-600 font-medium mb-1">{res.prompt || "Prompt"}</h3>
          {res.results.length > 0 ? (
            res.results.map((r: any, idx: number) => (
              <p
                key={idx}
                className="text-gray-800 text-sm leading-relaxed border-t border-blue-100 mt-2 pt-2"
              >
                {r.response}
              </p>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No results found.</p>
          )}
        </motion.div>
      ))}
    </div>
  );
}
