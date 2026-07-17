
import {NextResponse} from "next/server"

export async function GET(request: Request) {
    const {searchParams} = new URL(request.url)

    const owner = searchParams.get("owner")
    const repo = searchParams.get("repo")


    const includeMetrics = searchParams.get("metrics") === "true"

    try {
        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`)
        if (!includeMetrics) {
            if (response.status === 404) {
                return NextResponse.json(
                    {exists: false},
                    {status:404}
                )
            }

            return NextResponse.json(
                {exists: true},
                {status:200}
            )
        } else {
            const RepoData = await response.json() 
            return NextResponse.json(
                {
                    stars: RepoData.stargazers_count,
                    description: RepoData.description,
                    language: RepoData.language
                },
                {status: 200}
            )
        }


    } catch (error) {
        return NextResponse.json(
            {error: "failed"},
            {status: 500}
        )
    }
}
