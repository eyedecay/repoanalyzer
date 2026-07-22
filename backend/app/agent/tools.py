from sentence_transformers import SentenceTransformer
from app.scripts.store_vectors import get_database_connection
from pathlib import Path

model = SentenceTransformer("jinaai/jina-embeddings-v2-base-code", trust_remote_code=True)


def similarity_search_chunks(prompt: str, top_k: 5, owner: str, repo: str):
    """
    Tool call 
    Return the top-k (for now 5) chunks of the repo with closest cosine similarity to prompt
    Args:
        prompt (str): prompt
        top-k (int): How many of the closest chunks to return
        owner: (str): repo owner
        repo: (str): repo name
    Returns:
        list of tuples: 5 tuples of the closest chunks
    """
    embedding = model.encode(prompt)
    connection = get_database_connection()
    cursor = connection.cursor()

    cursor.execute(
        """
        SELECT
            file_path, 
            chunk_index, 
            content,
            1 - (embedding <=> %s::vector) AS similarity
        FROM chunk_vectors
        WHERE repo_owner = %s 
        AND repo_name = %s 
        ORDER by embeding <=> %s::vector
        LIMIT %s;
        """,
        (
            embedding, 
            owner, 
            repo, 
            embedding, 
            top_k

        )
    )

    results = cursor.fetchall()
    cursor.close()
    connection.close()
    return results

def read_file(owner: str, repo: str, file_path: str):
    """
    Tool call for the agent reading a specific file
    Args:
        owner (str): repo owner
        repo (str): repo name
        file_path (str): file path

    Returns:
        str: file contents
    """
    repo_cache = Path("app")/ "repo_cache"
    path = repo_cache / owner / repo / file_path 

    if not path.exists():
        return f"File {path} not found"
    
    return path.read_text(encoding = "utf-8")
