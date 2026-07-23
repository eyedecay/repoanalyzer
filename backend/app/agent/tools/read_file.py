from pathlib import Path

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
    repo_root = (repo_cache / f"{owner}_{repo}").resolve()
    path = (repo_root / file_path).resolve()

    #check if file is inside repo root (agent should only have access to their own repo)
    if not path.is_relative_to(repo_root):
        return "Invalid file path"

    #check if it exists
    if not path.exists():
        return f"File {path} not found"
    
    return path.read_text(encoding = "utf-8")

read_file_schema = {
    "type": "function",
    "function": {
        "name": "read_file", 
        "description": "read a file from the repository",
        "parameters": {
            "type": "object",
            "properties": {
                "owner": {
                    "type": "string"
                },
                "repo": {
                    "type": "string"
                },
                "file_path": {
                    "type": "string"
                }
            },
            "required": ["owner", "repo", "file_path"]
        }
    }
}