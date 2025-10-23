"use client";

import { Card, CardContent, Typography, Divider, Box } from "@mui/material";
import MetricsChart from "./MetricsChart";
import MetricProgress from "./MetricProgress";

interface ExperimentResultsProps {
  experiment: {
    prompt: string;
    metrics: any;
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
            <Box key={i} className="mt-6 border-t pt-4">
              <Typography
                variant="subtitle1"
                className="font-semibold text-gray-700 mb-2"
              >
                Response {i + 1}: {r.label || "Unnamed Model"}
              </Typography>

              <Typography
                variant="body1"
                className="text-gray-800 bg-gray-50 p-3 rounded-md border mb-3"
              >
                {r.response || "No response text"}
              </Typography>

              <Divider className="my-3" />

              <Typography
                variant="subtitle2"
                color="textSecondary"
                gutterBottom
              >
                Evaluation Metrics
              </Typography>

              {/* Ensure metrics exist before rendering */}
              {r.metrics ? (
                <>
                  <Box className="grid grid-cols-2 gap-4 mb-4">
                    <MetricProgress
                      label="Coherence"
                      value={r.metrics.coherenceScore ?? 0}
                    />
                    <MetricProgress
                      label="Diversity"
                      value={r.metrics.diversityScore ?? 0}
                    />
                    <MetricProgress
                      label="Relevance"
                      value={r.metrics.relevanceScore ?? 0}
                    />
                    <MetricProgress
                      label="Fluency"
                      value={r.metrics.fluencyScore ?? 0}
                    />
                  </Box>

                  <MetricsChart {...({ metrics: r.metrics } as any)} />
                </>
              ) : (
                <Typography variant="caption" color="textSecondary">
                  No metrics available.
                </Typography>
              )}
            </Box>
          ))
        )}
      </CardContent>
    </Card>
  );
}
