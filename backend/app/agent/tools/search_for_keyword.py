import os
def search_for_keyword(owner: str, repo: str, keyword: str):
    """
    Searches for a keyword and returns all files that match

    Args:
        owner (str): repo name
        repo (str): repo name
        keyword (str): keyword or phrase to search for

    Returns:
        list: all files that have a keyword in them
    """
    all_files = []
    repo_path = f"app/repo_cache/{owner}_{repo}"
    for root, directory, files in os.walk(repo_path):
        for filename in files:
            path = os.path.join(root, filename)
            try:
                with open(path, "r") as file:
                    content = file.read()
                    if keyword in content:
                        all_files.append(path)

            #if its not a readable file
            except Exception:
                continue

    return all_files



search_for_keyword_schema = {
    "type": "function",
    "function": {
        "name": "search_for_keyword", 
        "description": "Search for files that contain a specific keyword (or phrase). Use when the use asks for something specific, like a specific function name",
        "parameters": {
            "type": "object",
            "properties": {
                "owner": {
                    "type": "string"
                },
                "repo": {
                    "type": "string"
                },
                "keyword": {
                    "type": "string"
                }
            },
            "required": ["owner", "repo", "keyword"]
        }
    }
}