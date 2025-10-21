// src/components/ActionButtons.tsx
"use client";

import { Download, BarChart } from "lucide-react";


export default function ActionButtons() {
  const handleExport = () => {
    window.open("http://localhost:3000/api/export-all-experiments", "_blank");
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-md border border-blue-100 flex flex-col gap-3">
      <h2 className="text-lg font-semibold text-blue-600">Actions</h2>
      <button
        onClick={handleExport}
        className="flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
      >
        <Download className="w-4 h-4" /> Export CSV
      </button>

      <button
        onClick={() => (window.location.href = "/metricsChart")}
        className="flex items-center justify-center gap-2 border border-blue-500 text-blue-600 py-2 rounded-lg hover:bg-blue-50 transition"
      >
        <BarChart className="w-4 h-4" /> View Metrics
      </button>
    </div>
  );
}
