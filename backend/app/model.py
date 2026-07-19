import ollama

def chat_with_model(prompt: str): 


    response = ollama.chat(
        model = "llama3.2:3b",
        messages = [
            {
                "role": "user", 
                "content": prompt
            }
        ]
    )

    print(response["message"]["content"])
    return response["message"]["content"]