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

interface githubCommit {
    commit: {
        author: {
            date: string
        }
    }
}

export async function getCommitHistory(owner: string, repo: string) {
    let page = 1
    let allCommits: string[] = []

    let response = await fetch(`https://api.github.com/repos/${owner}/${repo}/commits?per_page=100&page=${page}`)
    let data = await response.json()

    while (data.length !== 0) {
        const dates = data.map((item: githubCommit) => item.commit.author.date)
        allCommits = allCommits.concat(dates)
        page ++

        response = await fetch(`https://api.github.com/repos/${owner}/${repo}/commits?per_page=100&page=${page}`)
        data = await response.json()
    }

    let commitHistory: Record<string, number> = {}; 

    for (const commit of allCommits) {
        const date = commit.split('T')[0]
        if (!commitHistory[date]) {
            commitHistory[date] = 0
        }
        commitHistory[date]++;
    }

    return commitHistory
}