from groq import Groq
from dotenv import load_dotenv
import os
from app.agent.tools.read_file import read_file, read_file_schema
from app.agent.tools.similarity_search_chunks import similarity_search_chunks, similarity_search_chunks_schema

load_dotenv()

tools = {
    "read_file": read_file,
    "similarity_search_chunks": similarity_search_chunks,
}

tools_schemas = [read_file_schema, similarity_search_chunks_schema]

class Agent():
    def __init__(self, model):
        self.model = model 
        self.tools = tools
        self.tools_schemas = tools_schemas
        self.client = Groq(api_key=os.getenv("GROQ_API_KEY"))


    def chat_with_model(self, prompt: str, owner: str, repo: str): 
        
        context = f"""
        You are analyzing this repository. Owner: {owner}, Repo: {repo}. All your responses should be about this repository
        """

        response = self.client.chat.completions.create(
            model = self.model, 
            messages = [
                {
                    "role": "system", 
                    "content": context
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            tools = self.tools_schemas
        )

        return response #.choices[0].message.content
    