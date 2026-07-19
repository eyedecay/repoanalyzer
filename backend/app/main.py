from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from app.model import chat_with_model
import requests
import httpx

app = FastAPI()

@app.get("/")
def main():
    return {
        "message": "Running"
    }

class ChatRequest(BaseModel):
    prompt: str
    owner: str 
    repo: str

@app.post("/chat")
def chat(request: ChatRequest):
    prompt = request.prompt
    owner = request.owner 
    repo = request.owner


    model_response = chat_with_model(prompt)
    return {
        "message": model_response

    }