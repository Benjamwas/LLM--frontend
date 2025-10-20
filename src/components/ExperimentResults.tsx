"use client";
import { Card, CardContent, Typography } from "@mui/material";
import MetricsChart from "./MetricsChart";
import MetricProgress from "./MetricProgress";

export default function ExperimentResults({ experiment }: { experiment: any }) {
  if (!experiment) return null;

  const parsedResults = experiment.results ? JSON.parse(experiment.results) : [];

  return (
    <Card className="mt-6 shadow-xl">
      <CardContent>
        <Typography variant="h6" color="primary" gutterBottom>
          Results for: {experiment.prompt}
        </Typography>

        {parsedResults.map((r: any, i: number) => (
          <div key={i} className="mt-6 border-t pt-3">
            <Typography variant="subtitle1" className="font-semibold text-gray-700">
              Response:
            </Typography>
            <Typography variant="body1" className="text-gray-800 mt-2">
              {r.response}
            </Typography>

            <div className="mt-4">
              <Typography variant="subtitle2" className="text-gray-600 mb-2">
                Evaluation Metrics
              </Typography>

              {/* Animated bars */}
              <MetricProgress label="Coherence" value={r.metrics.coherenceScore} />
              <MetricProgress label="Diversity" value={r.metrics.diversityScore} />

              {/* Chart View */}
              <MetricsChart metrics={r.metrics} />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}