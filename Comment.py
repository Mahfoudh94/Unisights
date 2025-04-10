from typing import Optional

from pydantic import BaseModel

class Comment(BaseModel):
    comment_text: str
    reactions: Optional[object]

