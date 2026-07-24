from pathlib import Path
import os

def get_directory_tree(owner: str, repo: str): 
    """
    Using the root of the repository being analyzed, it returns string (tree-like) structure 
    of the repo.

    Args:
        owner (str): repo owner
        repo (str): repo name

    Returns:
        str: repo tree-like structure
        e.g. backend
                app
                    agent
                    repo_cache
                    scripts
                    ...etc
    """
    tree = "" 
    root_path = f"app/repo_cache/{owner}_{repo}"

    for root, directory, files in os.walk(root_path):
        level = root.replace(root_path, "").count(os.sep)
        indent = "  " * level

        if level > 0:
            tree += f"{indent}{os.path.basename(root)}\n"

        for file in files:
            tree += f"{indent}  {file}\n"

    print(tree)
    return tree

get_directory_tree_schema = {
    "type": "function",
    "function": {
        "name": "get_directory_tree",
        "description": "This tool searches the repository tree. Use this tool when the user asks for how a project is structured, or along those lines",
        "parameters": {
            "type": "object",
            "properties": {}
        }
    }

}