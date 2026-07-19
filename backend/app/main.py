from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
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

@app.post("/chat")
def chat(request: ChatRequest):
    return {
        "mesage": "Backend route setup"
    }