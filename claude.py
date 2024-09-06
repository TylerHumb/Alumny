import anthropic
import os
from dotenv import load_dotenv

load_dotenv()
api_key = os.getenv('api_key_anthropic')

client = anthropic.Anthropic(api_key = api_key)

message = client.messages.create(
    model = "claude-3-haiku-20240307",
    max_tokens = 1024,
    temperature=0.1,
    messages= [{"role": "user", "content": "Do you work, Test?"}]
)

print(message.content)