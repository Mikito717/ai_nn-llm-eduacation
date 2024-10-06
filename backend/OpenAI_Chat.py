from openai import OpenAI
import os

# Set your OpenAI API key
token=os.getenv('OPENAI_API_KEY')
client = OpenAI(api_key=token)

def chat_with_openai(prompt):
    response =client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {
                "role": "system",
                "content": "You are a helpful assistant."
            },
            {
                "role": "user",
                "content": prompt
            }
        ],
        
        max_tokens=300
    )
    print("responce success")
    return response.choices[0].message.content
"""
if __name__ == "__main__":
    prompt = input("Enter your prompt: ")
    response = chat_with_openai(prompt)
    print("Response from OpenAI:", response)
"""