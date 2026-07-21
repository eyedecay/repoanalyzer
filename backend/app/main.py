from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from app.model import chat_with_model
from app.scripts.clone_repo import clone_repo
from app.scripts.store_vectors import store_vectors
import requests
import httpx

app = FastAPI()

class ChatRequest(BaseModel):
    prompt: str

class CloneRepo(BaseModel):
    owner: str 
    repo: str 

class StoreRepo(BaseModel):
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
    owner = request.owner
    
    repo = request.repo
    path = clone_repo(owner, repo)
    return {
        "path": str(path)
    }
    

@app.post("/store_vector")
def store_vector(request: StoreRepo):
    owner = request.owner 
    repo = request.repo
    store_vectors(owner, repo)