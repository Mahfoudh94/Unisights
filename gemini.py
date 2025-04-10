import os
from google import genai
from google.genai import types

GEMINI_API_KEY = os.environ['GEMINI_API_KEY']

def generate(_input):
    client = genai.Client(
        api_key=GEMINI_API_KEY,
    )

    model = "gemini-2.5-pro-exp-03-25"
    contents = [
        types.Content(
            role="user",
            parts=[
                types.Part.from_text(text=_input),
            ],
        ),
    ]
    generate_content_config = types.GenerateContentConfig(
        temperature=0,
        response_mime_type="application/json",
        response_schema=genai.types.Schema(
                        type = genai.types.Type.OBJECT,
                        properties = {
                            "posts": genai.types.Schema(
                                type = genai.types.Type.ARRAY,
                                items = genai.types.Schema(
                                    type = genai.types.Type.OBJECT,
                                    properties = {
                                        "post_text": genai.types.Schema(
                                            type = genai.types.Type.STRING,
                                        ),
                                        "reaction": genai.types.Schema(
                                            type = genai.types.Type.ARRAY,
                                            items = genai.types.Schema(
                                                type = genai.types.Type.OBJECT,
                                                properties = {
                                                    "reaction_type": genai.types.Schema(
                                                        type = genai.types.Type.STRING,
                                                    ),
                                                    "reaction_count": genai.types.Schema(
                                                        type = genai.types.Type.NUMBER,
                                                    ),
                                                },
                                            ),
                                        ),
                                        "date": genai.types.Schema(
                                            type = genai.types.Type.STRING,
                                        ),
                                    },
                                ),
                            ),
                        },
                    ),
        system_instruction=[
            types.Part.from_text(text="""You are an expert in extracting data from official university Facebook pages. Clean the data by removing all links and emojis. Return the final output strictly in JSON."""),
        ],
    )

    res = ""
    for chunk in client.models.generate_content_stream(
        model=model,
        contents=contents,
        config=generate_content_config,
    ):
        res = res + chunk.text

    return res

