from sentence_transformers import SentenceTransformer
from app.scripts.chunk_repo import chunk_repo

model = SentenceTransformer("jinaai/jina-embeddings-v2-base-code", trust_remote_code=True)


def store_vectors(owner, repo):
    
    chunks = chunk_repo(f"app/repo_cache/{owner}_{repo}")
    print(chunks)