import subprocess
from pathlib import Path
import shutil

MAX_REPO_SIZE = 500 * 1024 * 1024
MAX_CACHE_SIZE = 20 * 1024 ** 3
CACHE_DIR = Path("app")/"repo_cache"

def get_directory_size(path: Path):
    """
    Get a directory size 

    Args:
        path (Path): the path to directory (under app/repo_cache)

    Returns:
        size: size of all the files combined in the repo
    """
    total_size = 0
    for file in path.rglob("*"):
        if file.is_file():
            total_size += file.stat().st_size 
    
    return total_size

def get_cache_size():
    """

    Returns:
        int: total size of the cache. must not exceed the limit or else remove_repo_from_cache() is called
    """
    return sum(get_directory_size(repo) for repo in CACHE_DIR.iterdir() if repo.is_dir())

def remove_repo_from_cache():
    """
    Removes a repo from cache if limit exceeded
    """
    repos = [repo for repo in CACHE_DIR.iterdir() if repo.is_dir()]
    if not repos:
        return 
    
    oldest_repo = min(repos, key = lambda repo: repo.stat().st_mtime)
    shutil.rmtree(oldest_repo)

def clone_repo(owner, repo):
    """
    Clone repo into a temporary repo cache

    Args:
        repo (str): repo git link
    """
    CACHE_DIR.mkdir(exist_ok = True)

    path = CACHE_DIR /f"{owner}_{repo}"

    if path.exists():
        print("Already exists")
        return path

    
    subprocess.run(["git", "clone", f"https://github.com/{owner}/{repo}.git", str(path)])
    if get_directory_size(path) > MAX_REPO_SIZE:
        shutil.rmtree(path)
        raise Exception("Repo too large ")
    
    while get_cache_size() > MAX_CACHE_SIZE:
        remove_repo_from_cache()
    
    return path

    
    




