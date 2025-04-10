"use client";
import type { ColumnDef } from "@tanstack/react-table";
import type { Insight } from "@/types/sentiments";

export const columns: ColumnDef<Insight>[] = [
  {
    accessorKey: "post_text",
    header: "Post Text",
    cell: ({ row }) => (
      <div className="max-w-[300px] truncate">{row.getValue("post_text")}</div>
    ),
  },
  {
    accessorKey: "timestamp",
    header: "Posted",
    cell: ({ row }) => (
      <div className="whitespace-nowrap">{row.getValue("timestamp")}</div>
    ),
  },
  {
    accessorKey: "total_reactions",
    header: "Total Reactions",
  },
  {
    accessorKey: "positive_reaction_count",
    header: "Positive Reactions",
  },
  {
    accessorKey: "negative_reaction_count",
    header: "Negative Reactions",
  },
  {
    accessorKey: "engagement_sentiment",
    header: "Engagement Sentiment",
    cell: ({ row }) => {
      const sentiment = row.getValue("engagement_sentiment");
      return (
        <div
          className={`rounded-md px-2 py-1 text-center ${
            sentiment === "Positive"
              ? "bg-green-100 text-green-800"
              : sentiment === "Negative"
                ? "bg-red-100 text-red-800"
                : "bg-gray-100 text-gray-800"
          }`}
        >
          {sentiment as string}
        </div>
      );
    },
  },
  {
    accessorKey: "text_sentiment",
    header: "Text Sentiment",
    cell: ({ row }) => {
      const sentiment = row.getValue("text_sentiment");
      return (
        <div
          className={`rounded-md px-2 py-1 text-center ${
            sentiment === "POSITIVE"
              ? "bg-green-100 text-green-800"
              : sentiment === "NEGATIVE"
                ? "bg-red-100 text-red-800"
                : "bg-gray-100 text-gray-800"
          }`}
        >
          {sentiment as string}
        </div>
      );
    },
  },
  {
    accessorKey: "text_sentiment_score",
    header: "Sentiment Score",
    cell: ({ row }) => {
      const score = parseFloat(row.getValue("text_sentiment_score"));
      return (
        <div
          className={`rounded-md px-2 py-1 text-center ${
            score > 0
              ? "bg-green-100 text-green-800"
              : score < 0
                ? "bg-red-100 text-red-800"
                : "bg-gray-100 text-gray-800"
          }`}
        >
          {score.toFixed(2)}
        </div>
      );
    },
  },
];
