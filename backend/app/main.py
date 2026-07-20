from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from app.model import chat_with_model
import requests
import httpx

app = FastAPI()

class ChatRequest(BaseModel):
    prompt: str

class CloneRepo(BaseModel):
    owner: str 
    repo: str 


@app.get("/")
def main():
    return {
        "message": "Running"
    }


@app.post("/chat")
def chat(request: ChatRequest):
    prompt = request.prompt


    model_response = chat_with_model(prompt)
    return {
        "message": model_response

    }

@app.post("/clone") 
def clone(request: CloneRepo):
    print("Initialized")
    print(request.owner)
    print(request.repo)