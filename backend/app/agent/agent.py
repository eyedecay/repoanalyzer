from groq import Groq
from dotenv import load_dotenv
import os
from app.agent.tools.read_file import read_file, read_file_schema
from app.agent.tools.similarity_search_chunks import similarity_search_chunks, similarity_search_chunks_schema
import json

load_dotenv()

tools = {
    "read_file": read_file,
    "similarity_search_chunks": similarity_search_chunks,
}

tools_schemas = [read_file_schema, similarity_search_chunks_schema]

class Agent():
    """
    The agent class that represents an instance of the agent
    Attributes:
        model: (model)
        tools: the tools the model has access to
        tools_schemas: json of what the model should return when calling a tool
        client: communication with groq api

    """
    def __init__(self, model):
        self.model = model 
        self.tools = tools
        self.tools_schemas = tools_schemas
        self.client = Groq(api_key=os.getenv("GROQ_API_KEY"))


    def chat_with_model(self, prompt: str, owner: str, repo: str): 
        """
        Chats with the model (called by the /chat endpoint)
        Args:
            prompt (str): original prompt sent in by the user
            owner (str): repo owner
            repo (str): repo name
        """
        
        context = f"""
        You are analyzing this repository. Owner: {owner}, Repo: {repo}. All your responses should be about this repository
        """
        messages = [
                {
                    "role": "system", 
                    "content": context
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ]

        response = self.client.chat.completions.create(
            model = self.model, 
            messages = messages,
            tools = self.tools_schemas,
            temperature = 0
        )

        while response.choices[0].message.tool_calls:
            message = response.choices[0].message
            messages.append(message)
            for tool_call in message.tool_calls:
                tool_name = tool_call.function.name
                arguments = json.loads(tool_call.function.arguments)

                #Use the tool and the arguments
                function = self.tools[tool_name]
                result = function(**arguments)

                #add it to messages/context model receives for later prompts
                messages.append({
                    "role": "tool",
                    "tool_call_id": tool_call.id,
                    "content": str(result)
                })
            
            response = self.client.chat.completions.create(
            model = self.model, 
            messages = messages,
            tools = self.tools_schemas
        )

        #if it does not return a tool call, just return content
        return response.choices[0].message.content
    