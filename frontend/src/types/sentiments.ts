export type Sentiment = "POSITIVE" | "NEGATIVE" | "NEUTRAL";

export type Insight = {
  post_text: string;
  timestamp: string;
  total_reactions: string;
  positive_reaction_count: number;
  negative_reaction_count: number;
  engagement_sentiment: string; 
  text_sentiment: Sentiment;
  text_sentiment_score: number;
};

export type ProcessedDataItem = {
  insight: Insight;
};

export type ProcessedData = {
  processed_data: ProcessedDataItem[];
};