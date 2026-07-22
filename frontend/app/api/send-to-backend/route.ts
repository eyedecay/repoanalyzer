import { NextResponse } from "next/server"

export async function POST(request: Request) {

    //receive data from the client request.
    const body = await request.json() 


    //send request to fastAPI
    const response = await fetch("http://localhost:8000/chat", {
        method: "POST", 
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            prompt: body.prompt,
            owner: body.owner, 
            repo: body.repo, 

        })
    })

    const data = await response.json()
    

    return NextResponse.json(data)
}