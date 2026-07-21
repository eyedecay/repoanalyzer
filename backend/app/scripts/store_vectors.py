from sentence_transformers import SentenceTransformer
from app.scripts.chunk_repo import chunk_repo
import psycopg
from dotenv import load_dotenv
import os

load_dotenv()
def get_database_connection():
    return psycopg.connect(dbname = os.getenv("POSTGRES_DB"), user = os.getenv("POSTGRES_USER"), password = os.getenv("POSTGRES_PASSWORD"))

model = SentenceTransformer("jinaai/jina-embeddings-v2-base-code", trust_remote_code=True)


def store_vectors(owner, repo):
    connection = get_database_connection()
    cursor = connection.cursor()
    
    chunks = chunk_repo(f"app/repo_cache/{owner}_{repo}")
    print(chunks[0])

    for chunk in chunks:
        file_path = chunk["file_path"]
        extension = chunk["language"]
        chunk_index = chunk["chunk_index"]
        content = chunk["content"]
        embedding = model.encode(content) 

        cursor.execute(
            """
            INSERT INTO chunk_vectors
            ( 
                repo_owner,
                repo_name, 
                file_path, 
                extension, 
                chunk_index,
                content,
                embedding
            )
            VALUES (%s, %s, %s, %s, %s, %s, %s)
            """,
            (
                owner, 
                repo, 
                file_path,
                extension, 
                chunk_index, 
                content, 
                embedding.tolist()
            )
            
        )
    connection.commit()
    cursor.close()
    connection.close()
        