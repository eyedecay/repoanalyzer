CREATE table chunk_vectors(
    id SERIAL PRIMARY KEY, 
    owner TEXT NOT NULL,
    repo TEXT NOT NULL,
    file_path TEXT NOT NULL,
    extension TEXT, 
    chunk_index INTEGER NOT NULL
    CONTENT TEXT 
    embedding vector(768)
)