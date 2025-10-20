"use client";
import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import PromptForm from "@/components/PromptForm";
import ExperimentResults from "@/components/ExperimentResults";
import api from "@/lib/api";

export default function HomePage() {
  const [experiments, setExperiments] = useState<any[]>([]);
  const [selected, setSelected] = useState<any>(null);

  const fetchExperiments = async () => {
    const { data } = await api.get("/export-all-experiments");
    setExperiments(data);
  };

  useEffect(() => {
    fetchExperiments();
  }, []);

  const handleNewExperiment = (exp: any) => {
    setSelected(exp);
    fetchExperiments();
  };

  return (
    <div className="flex bg-background min-h-screen">
      <Sidebar history={experiments} />
      <main className="flex-1 ml-[260px] p-10 bg-gradient-to-br from-blue-50 to-white min-h-screen transition-all duration-500">
  <PromptForm onExperiment={handleNewExperiment} />
  <ExperimentResults experiment={selected} />
</main>

    </div>
  );
}
