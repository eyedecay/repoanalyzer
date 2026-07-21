CREATE table chunk_vectors(
    id SERIAL PRIMARY KEY, 
    repo_owner TEXT NOT NULL,
    repo_name TEXT NOT NULL,
    file_path TEXT NOT NULL,
    extension TEXT, 
    chunk_index INTEGER NOT NULL,
    CONTENT TEXT,
    embedding vector(768)

    UNIQUE(repo_owner, repo_name, file_path, chunk_index)
);