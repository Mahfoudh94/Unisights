import asyncio
import re

from pandas.io.clipboard import clipboard_set
from playwright.async_api import async_playwright
from telethon import TelegramClient
from telethon.tl.patched import Message

import gemini
from TelePost import TelePost, TelePosts
from gemini import generate

api_id = os.environ["API_ID"]
api_hash = os.environ["API_HASH"]
phone = os.environ["PHONE"]
channel = "channel name here"

client = TelegramClient('elsession', api_id, api_hash)
inp = ""


async def main():
    await client.start(phone=phone)
    entity = await client.get_entity(channel)
    messages: TelePosts = TelePosts(posts=[])
    message: Message
    async for message in client.iter_messages(entity, 10):
        messages.posts.append(
            TelePost(
                post_text=message.message,
                views=message.views,
                reactions=message.reactions,
                comments=None,
                date=message.date,
            )
        )
        # message.reactions.to_dict() if message.reactions else None

    print(messages.model_dump_json())

async def pw():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=False)
        page = await browser.new_page()
        await page.goto("https://www.facebook.com/groups/635076825014047", wait_until="networkidle")
        await page.click('[aria-label=Close]')
        await page.wait_for_timeout(1000)
        await page.evaluate("document.body.style.zoom = '1%'")
        await page.wait_for_timeout(10000)
        inp = (await page.locator("[data-pagelet=GroupFeed]").inner_html())
        data = gemini.generate(inp)

        match = re.search(r"([{\[].*[}\]])", data, re.DOTALL)
        print(match.group(1))


if __name__ == "__main__":
    asyncio.run(pw())
    # generate(inp)
