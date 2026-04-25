"""
Генерация объяснений на любую тему через GPT-4o mini.
Принимает тему и уровень сложности, возвращает понятное объяснение.
"""
import json
import os
import urllib.request


LEVEL_PROMPTS = {
    "просто": "Объясни простыми словами, используй аналогии и образы. Никаких сложных терминов. Максимум 3-4 предложения.",
    "средне": "Объясни доступно, упомяни ключевые понятия и принципы работы. 4-5 предложений.",
    "глубоко": "Дай техническое объяснение с терминами, деталями реализации, формулами если уместно. 5-7 предложений.",
}


def handler(event: dict, context) -> dict:
    cors_headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors_headers, "body": ""}

    body = json.loads(event.get("body") or "{}")
    topic = (body.get("topic") or "").strip()
    level = body.get("level", "просто")

    if not topic:
        return {
            "statusCode": 400,
            "headers": cors_headers,
            "body": json.dumps({"error": "Тема не указана"}, ensure_ascii=False),
        }

    level_instruction = LEVEL_PROMPTS.get(level, LEVEL_PROMPTS["просто"])

    prompt = f"""Тема: «{topic}»

{level_instruction}

Отвечай только на русском языке. Не пиши заголовков, не используй markdown. Просто текст объяснения."""

    api_key = os.environ["OPENAI_API_KEY"]
    payload = json.dumps({
        "model": "gpt-4o-mini",
        "messages": [
            {
                "role": "system",
                "content": "Ты — эксперт-объяснятель. Твоя задача — объяснять сложные вещи понятно, адаптируя стиль под уровень аудитории.",
            },
            {"role": "user", "content": prompt},
        ],
        "max_tokens": 400,
        "temperature": 0.7,
    }).encode()

    req = urllib.request.Request(
        "https://api.openai.com/v1/chat/completions",
        data=payload,
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
        },
        method="POST",
    )

    with urllib.request.urlopen(req, timeout=25) as resp:
        data = json.loads(resp.read())

    explanation = data["choices"][0]["message"]["content"].strip()

    return {
        "statusCode": 200,
        "headers": cors_headers,
        "body": json.dumps({"explanation": explanation}, ensure_ascii=False),
    }
