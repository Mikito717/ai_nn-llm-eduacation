import os
from openai import OpenAI

# Set your OpenAI API key
token = os.getenv('OPENAI_API_KEY')
client = OpenAI(api_key=token)

# Global variable to store conversation history
conversation_history = []

def chat_with_openai(prompt, chatnumber, reset_flag):
    global conversation_history
    
    if reset_flag:
        conversation_history = [
            {
                "role": "system",
                "content": "You are a helpful assistant."
            }
        ]
    else:
        conversation_history.append({
            "role": "user",
            "content": prompt
        })
    
    response = client.chat.completions.create(
        model="gpt-4o",
        messages=conversation_history,
        max_tokens=300
    )
    
    conversation_history.append({
        "role": "assistant",
        "content": response.choices[0].message.content
    })
    
    print("response success")
    return response.choices[0].message.content

if __name__ == "__main__":
    prompt = input("Enter your prompt: ")
    reset_flag = input("Reset conversation? (yes/no): ").lower() == 'yes'
    response = chat_with_openai(prompt, chatnumber=1, reset_flag=reset_flag)
    print("Response from OpenAI:", response)
