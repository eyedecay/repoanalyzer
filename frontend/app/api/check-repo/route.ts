
import {NextResponse} from "next/server"
import { checkRepoExistence } from "@/app/lib/githubFetch"

export async function GET(request: Request) {
    const {searchParams} = new URL(request.url)

    const owner = searchParams.get("owner")
    const repo = searchParams.get("repo")

    if (owner === null || repo === null) {
        return NextResponse.json(
                {exists: false},
                {status:404}
            )
    }
    
    try {
        const response = await checkRepoExistence(owner, repo)
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
        

    } catch (error) {
        return NextResponse.json(
            {error: "failed"},
            {status: 500}
        )
    }
}
