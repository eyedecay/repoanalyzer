import ollama

class Agent():
    def __init__(self, model, tools):
        self.model = model 
        self.tools = tools


    def chat_with_model(self, prompt: str, owner: str, repo: str): 
        
        context = f"""
        You are analyzing this repository. Owner: {owner}, Repo: {repo}. All your responses should be about this repository
        """
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