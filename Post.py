from datetime import datetime
from typing import Optional, List, Literal
from pydantic import BaseModel

from Comment import Comment


class Post(BaseModel):
    source: Literal["TELEGRAM", "FACEBOOK"]
    post_text: str
    views: Optional[int]
    reactions: Optional[object]
    # media: Optional[List[object]]
    comments: Optional[List[Comment]]
    date: Optional[datetime]

class Posts(BaseModel):
    posts: Optional[List[Post]]