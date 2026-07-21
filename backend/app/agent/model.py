import ollama

class Agent():
    def __init__(self, model, tools):
        self.model = model 
        self.tools = tools


    def chat_with_model(self, prompt: str): 

        response = ollama.chat(
            model = self.model,
            messages = [
                {
                    "role": "user", 
                    "content": prompt
                }
            ]
        )

        print(response["message"]["content"])
        return response["message"]["content"]