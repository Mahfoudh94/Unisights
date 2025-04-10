from typing import Optional, Literal, List, Any

from pydantic import ConfigDict, field_serializer
from telethon.tl.types import MessageReactions

from Post import Post, Posts


class FBPost(Post):
    source: Literal["TELEGRAM", "FACEBOOK"] = "FACEBOOK"
    reactions: Any
    model_config = ConfigDict(arbitrary_types_allowed=True)

    @field_serializer('reactions')
    def serialize_reactions(self, reactions: MessageReactions):
        if reactions is None:
            return 0
        return sum(
            reaction.count if reaction else 0
                for reaction in reactions.results
        )


class FBlePosts(Posts):
    posts: Optional[List[FBPost]]
