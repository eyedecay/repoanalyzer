from sentence_transformers import SentenceTransformer
from app.scripts.store_vectors import get_database_connection
from pathlib import Path

model = SentenceTransformer("jinaai/jina-embeddings-v2-base-code", trust_remote_code=True)


def similarity_search_chunks(prompt: str, owner: str, repo: str, top_k: int = 5,):
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
    embedding = model.encode(prompt).tolist()
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
        ORDER by embedding <=> %s::vector
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

similarity_search_chunks_schema = {
    "type": "function",
    "function": {
        "name": "similarity_search_chunks", 
        "description": "based on the prompt you are given, find the chunks with the closest similarity index",
        "parameters": {
            "type": "object",
            "properties": {
                "prompt": {
                    "type": "string"
                },
            },
            "required": ["prompt"]
        }
    }
}