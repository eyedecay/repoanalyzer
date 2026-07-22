from groq import Groq
from dotenv import load_dotenv
import os

load_dotenv()

class Agent():
    def __init__(self, model, tools):
        self.model = model 
        self.tools = tools
        self.client = Groq(api_key="GROQ_API_KEY")


    def chat_with_model(self, prompt: str, owner: str, repo: str): 
        
        context = f"""
        You are analyzing this repository. Owner: {owner}, Repo: {repo}. All your responses should be about this repository
        """

        response = self.client.models.generate_content(
            model = self.model, 
            contents = prompt
        )

        return response.choices[0].message.content
    