import os
from openai import OpenAI
from datetime import datetime

# Set your OpenAI API key
token = os.getenv('OPENAI_API_KEY')
client = OpenAI(api_key=token)

# Global variable to store conversation history
conversation_history = []

def chat_with_openai(prompt, chatnumber, reset_flag, username):
    global conversation_history
    
    if reset_flag:
        # Create directory if it does not exist
        user_dir = f"../database/userdata/{username}"
        if not os.path.exists(user_dir):
            os.makedirs(user_dir)
        
        # Create file if it does not exist
        current_time = datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
        conversation_file = f"{user_dir}/role{chatnumber}_conversation_{current_time}.txt"
        if not os.path.exists(conversation_file):
            with open(conversation_file, "w", encoding="utf-8") as f:
                f.write("")  # Create an empty file
        
        # Save conversation history
        with open(conversation_file, "w", encoding="utf-8") as f:
            f.write("\n".join([f"{item['role']}: {item['content']}" for item in conversation_history]))
        
        # Read system prompt
        with open(f"./system_prompts/role{chatnumber}_system_prompts.txt", "r", encoding="utf-8") as f:
            system_prompt = f.read()
        
        print("reset conversation")
        conversation_history = [
            {
                "role": "system",
                "content": f"You are a helpful assistant.{system_prompt}"
            }
        ]
        
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
    while True:
        prompt = input("Enter your prompt: ")
        if prompt == "exit":
            break
        reset_flag = input("Reset conversation? (yes/no): ").lower() == 'yes'
        response = chat_with_openai(prompt, chatnumber=1, reset_flag=reset_flag,username="test")
        print(conversation_history)
        print("Response from OpenAI:", response)
