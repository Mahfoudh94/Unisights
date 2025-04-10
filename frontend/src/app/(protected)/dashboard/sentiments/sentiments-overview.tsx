"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { getAllInsights } from "@/data/insights";
import { Insight } from "@/types/sentiments";

const chartConfig = {
  positive: {
    label: "Positive Reactions",
    color: "#10b981", // Green for positive
  },
  negative: {
    label: "Negative Reactions",
    color: "#ef4444", // Red for negative
  },
} satisfies ChartConfig;

export function ReactionChart() { // Changed from generic 'Component' to more descriptive name
  const data = getAllInsights();
  
  const chartData = data.map((insight, index) => ({
    name: `Post ${index + 1}`,
    positive: insight.positive_reaction_count,
    negative: -Math.abs(insight.negative_reaction_count), // Ensure negative values are negative
    post_text: insight.post_text,
    timestamp: new Date(insight.timestamp).toLocaleDateString(), // Format date for better readability
  }));

  type ChartData =  {
    name: string;
    positive: number;
    negative: number;
    post_text: string;
    timestamp: string;
}

  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full max-h-72">
      <BarChart
        accessibilityLayer
        data={chartData}
        stackOffset="sign"
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }} // Added margins for better spacing
      >
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis
          dataKey="name"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <ChartTooltip
          content={
            <ChartTooltipContent
              additionalInfo={(payload: { payload: ChartData; }[]) => {
                if (!payload?.[0]?.payload) return null;
                const data = payload[0].payload;
                return (
                  <div className="text-xs text-muted-foreground space-y-1">
                    <p className="font-medium">{data.post_text}</p>
                    <p>Posted: {data.timestamp}</p>
                    <p>Positive: {Math.abs(data.positive)}</p>
                    <p>Negative: {Math.abs(data.negative)}</p>
                  </div>
                );
              }}
            />
          }
        />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar 
          dataKey="positive" 
          fill="var(--color-positive)" 
          radius={[4, 4, 0, 0]} // Rounded top corners only
          name="Positive Reactions"
        />
        <Bar 
          dataKey="negative" 
          fill="var(--color-negative)" 
          radius={[4, 4, 0, 0]} // Rounded top corners only
          name="Negative Reactions"
        />
      </BarChart>
    </ChartContainer>
  );
}