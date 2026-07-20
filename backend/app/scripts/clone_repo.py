import subprocess
from pathlib import Path

def clone_repo(owner, repo):
    """
    Clone repo into a temporary repo cache

    Args:
        repo (str): repo git link
    """

    path = Path("app") / "repo_cache"/ f"{owner}_{repo}"
    if path.exists():
        print("Already exists")
    else:
        subprocess.run(["git", "clone", f"https://github.com/{owner}/{repo}.git", str(path)])
    
    




