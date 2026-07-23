from pathlib import Path 

MAX_CHUNK_SIZE = 10000

DIR_IGNORES = {
    ".git",
    "__pycache__",
    "venv",
    ".venv",
    "node_modules",
}

CODE_EXTENSIONS = {
    ".py",
    ".js",
    ".ts",
    ".tsx",
    ".java",
    ".cpp",
    ".c",
    ".go",
    ".rs",
    ".md"
}

def ignore(path: Path):
    """

    Args:
        path (Path): path

    Returns:
        bool: if that file should be ignores
    """
    return any(part in DIR_IGNORES for part in path.parts)

def get_chunks(content):
    """
    Chunk a file and return the chunks

    Args:
        content (str): file contents

    Returns:
        arr: chunks of string
    """
    if len(content) <= MAX_CHUNK_SIZE:
        return [content]
    
    chunks = []

    for i in range(0, len(content), MAX_CHUNK_SIZE):
        chunks.append(content[i:i+MAX_CHUNK_SIZE])
    
    return chunks

def chunk_repo(repo_path):
    """
    Goes through every file inside a repo directory and returns all chunks

    Args:
        repo_path (Path): directory

    Returns:
        arra[Dict]: chunks formatted like this: 
        {
                "file_path": str(file.relative_to(repo_path)),
                "language": file.suffix,
                "chunk_index": index,
                "content": chunk
        }
    """
    repo_path = Path(repo_path)
    chunks = []
    for file in repo_path.rglob("*"):
        if not file.is_file() or ignore(file) or file.suffix not in CODE_EXTENSIONS:
            continue
        
        try:
            content = file.read_text(encoding="utf-8")
        except UnicodeDecodeError:
            continue 
    
        file_chunks = get_chunks(content) 

        for index,chunk in enumerate(file_chunks):

            if not chunk.strip():
                continue
            
            chunks.append({
                "file_path": str(file.relative_to(repo_path)),
                "language": file.suffix,
                "chunk_index": index,
                "content": chunk
            })
    return chunks

