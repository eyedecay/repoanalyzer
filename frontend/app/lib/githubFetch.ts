export async function checkRepoExistence(owner: string, repo: string) {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`)
    return response
}

export async function getRepoMetrics(owner: string, repo: string) {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`)
    const repoData = await response.json()

    return {
        stars: repoData.stargazers_count,
        description: repoData.description,
        language: repoData.language,
        status: 200
    }
    
}