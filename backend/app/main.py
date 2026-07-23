from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from app.agent.agent import Agent
from app.scripts.clone_repo import clone_repo
from app.scripts.store_vectors import store_vectors
from fastapi.responses import StreamingResponse
import requests
import httpx
import json 
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

limiter = Limiter(key_func = get_remote_address)
app = FastAPI()
app.state.limiter = limiter

app.add_exception_handler(
    RateLimitExceeded, 
    _rate_limit_exceeded_handler
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "*"
    ],
    allow_credentials = True, 
    allow_methods = ["*"],
    allow_headers = ["*"]
)
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
@limiter.limit("10/minute")
def chat(request: Request, data: ChatRequest):


    model_response = StreamingResponse(agent.chat_with_model(data.prompt, data.owner, data.repo), media_type = "text/plain")
    return model_response
    
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

    return {
        "message": "stored"
    }