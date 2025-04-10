from sqlalchemy import create_engine, Column, Integer, String, Float, DateTime, Text
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
from sqlalchemy.types import Enum as SQLAlchemyEnum # Avoid name collision
from datetime import datetime
from typing import Optional
import enum

# Define Enum outside for reusability
class SentimentValue(enum.Enum):
    POSITIVE = "Positive"
    NEGATIVE = "Negative"
    NEUTRAL = "Neutral"
    MIXED = "Mixed"
    NA = "N/A"

# Define the Base for declarative models
class Base(DeclarativeBase):
    pass

class ProcessedPostOrm(Base):
    """SQLAlchemy ORM model for processed post data."""
    __tablename__ = 'processed_posts'

    id: Mapped[int] = mapped_column(primary_key=True) # Typically add a primary key
    original_date: Mapped[str] = mapped_column(String(50)) # Adjust length as needed
    timestamp: Mapped[datetime] = mapped_column(DateTime(timezone=True)) # Store timezone info
    post_text: Mapped[Optional[str]] = mapped_column(Text, nullable=True) # Use Text for long strings
    text_sentiment: Mapped[Optional[SentimentValue]] = mapped_column(SQLAlchemyEnum(SentimentValue, name="text_sentiment_enum"), nullable=True)
    text_sentiment_score: Mapped[Optional[float]] = mapped_column(Float, nullable=True)
    positive_reaction_count: Mapped[int] = mapped_column(Integer, default=0)
    negative_reaction_count: Mapped[int] = mapped_column(Integer, default=0)
    total_reactions: Mapped[int] = mapped_column(Integer, default=0)
    engagement_sentiment: Mapped[SentimentValue] = mapped_column(SQLAlchemyEnum(SentimentValue, name="engagement_sentiment_enum"), default=SentimentValue.NA)
    source: Mapped[str] = mapped_column(String(100)) # Adjust length

    def __repr__(self):
        return f"<ProcessedPostOrm(id={self.id}, source='{self.source}', date='{self.original_date}')>"

# Example Usage (Setting up engine and creating table - typically done once)
# engine = create_engine("sqlite:///posts.db") # Example using SQLite
# Base.metadata.create_all(engine)

# Example creating an instance (you'd parse JSON and create objects before adding to session)
# post_orm = ProcessedPostOrm(
#     original_date="4d",
#     timestamp=datetime.fromisoformat("2025-04-04T10:00:00Z".replace('Z', '+00:00')),
#     post_text="نداء إلى الضمير الحي! ...",
#     text_sentiment=SentimentValue.NEGATIVE,
#     text_sentiment_score=-0.8,
#     positive_reaction_count=10,
#     negative_reaction_count=0,
#     total_reactions=10,
#     engagement_sentiment=SentimentValue.POSITIVE,
#     source="Facebook"
# )

# # Add to session and commit (SQLAlchemy specific workflow)
# from sqlalchemy.orm import sessionmaker
# Session = sessionmaker(bind=engine)
# with Session() as session:
#     session.add(post_orm)
#     session.commit()