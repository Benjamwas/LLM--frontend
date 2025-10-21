"use client";
import { Card, CardContent, Typography } from "@mui/material";
import MetricsChart from "./MetricsChart";
import MetricProgress from "./MetricProgress";

interface ExperimentResultsProps {
  experiment: {
    prompt: string;
    results?: string; // stored as stringified JSON
  } | null;
}

export default function ExperimentResults({ experiment }: ExperimentResultsProps) {
  if (!experiment) return null;

  let parsedResults: any[] = [];
  try {
    parsedResults = experiment.results ? JSON.parse(experiment.results) : [];
  } catch (error) {
    console.error("Error parsing experiment results:", error);
  }

  return (
    <Card className="mt-6 shadow-xl">
      <CardContent>
        <Typography variant="h6" color="primary" gutterBottom>
          Results for: {experiment.prompt}
        </Typography>

        {parsedResults.length === 0 ? (
          <Typography variant="body2" className="text-gray-500 mt-3">
            No results available for this experiment.
          </Typography>
        ) : (
          parsedResults.map((r: any, i: number) => (
            <div key={i} className="mt-6 border-t pt-3">
              <Typography variant="subtitle1" className="font-semibold text-gray-700">
                Response:
              </Typography>
              <Typography variant="body1" className="text-gray-800 mt-2">
                {r.response || "No response text"}
              </Typography>

              <div className="mt-4">
                <Typography variant="subtitle2" className="text-gray-600 mb-2">
                  Evaluation Metrics
                </Typography>

                {/* ✅ Ensure metric values exist and are numeric */}
                <MetricProgress label="Coherence" value={r.metrics?.coherenceScore ?? 0} />
                <MetricProgress label="Diversity" value={r.metrics?.diversityScore ?? 0} />

                {/* ✅ MetricsChart now receives proper prop type */}
                {r.metrics ? (
                  <MetricsChart metrics={r.metrics} />
                ) : (
                  <Typography variant="caption" color="textSecondary">
                    No metrics available
                  </Typography>
                )}
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
