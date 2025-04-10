from datetime import datetime
from enum import Enum
from typing import Optional
from pydantic import BaseModel


class SentimentValue(str, Enum):
    POSITIVE = "Positive"
    NEGATIVE = "Negative"
    NEUTRAL = "Neutral"

class ProcessedData(BaseModel):
    original_date: str
    timestamp: datetime                 # Pydantic automatically parses ISO 8601 strings
    post_text: Optional[str] = None     # Optional field, defaults to None if missing in JSON
    text_sentiment: SentimentValue = SentimentValue.NEUTRAL # Use Enum, default to NA if missing/invalid
    text_sentiment_score: Optional[float] = None # Optional float, defaults to None
    positive_reaction_count: int = 0    # Defaults to 0 if missing
    negative_reaction_count: int = 0    # Defaults to 0 if missing
    total_reactions: int = 0            # Defaults to 0 if missing
    engagement_sentiment: SentimentValue = SentimentValue.NEUTRAL # Use Enum, default to NA
    source: str