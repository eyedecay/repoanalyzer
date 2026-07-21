from sentence_transformers import SentenceTransformer
from app.scripts.store_vectors import get_database_connection

model = SentenceTransformer("jinaai/jina-embeddings-v2-base-code", trust_remote_code=True)


def similarity_searcH_chunks(prompt: str, tok_k: 5):
    embedding = model.encode(prompt)
    connection = get_database_connection()
    cursor = connection.cursor()

    cursor.execute(
        """
        
        """
    )
