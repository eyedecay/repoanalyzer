from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from backend.app.agent.agent import Agent
from app.scripts.clone_repo import clone_repo
from app.scripts.store_vectors import store_vectors
import requests
import httpx

app = FastAPI()
agent = Agent(model = "llama-3.3-70b-versatile")

class ChatRequest(BaseModel):
    prompt: str
    owner: str 
    repo: str

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


    model_response = agent.chat_with_model(request.prompt, request.owner, request.repo)
    return {
        "message": model_response
        

    }

@app.post("/clone") 
def clone(request: CloneRepo):
    owner = request.owner
    
    repo = request.repo
    try:
        path = clone_repo(owner, repo)
        return {
            "path": str(path)
        }
    except Exception as e:
        raise HTTPException(
            status_code = 400, detail = str(e)
        )

@app.post("/store_vector")
def store_vector(request: StoreRepo):
    owner = request.owner 
    repo = request.repo
    store_vectors(owner, repo)