import { NextResponse } from "next/server"

export async function POST(request: Request) {
    const body = await request.json() 
    const prompt = body.prompt 


    //send request to fastAPI
    const response = await fetch("http://localhost:8000/chat", {
        method: "POST", 
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            prompt: prompt
        })
    })

    const data = await response.json()
    

    return NextResponse.json(data)
}