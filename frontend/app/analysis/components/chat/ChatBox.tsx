"use client"
import { ArrowUp } from "lucide-react"
import { useState } from "react"

interface ChatBoxProps {
    onSend: (message: string) => void,
    onBotMessage: (aiResponse: string) => void,
    streamBotMessage: (content: string) => void,
    owner: string, 
    repo: string

}

const ChatBox = ({onSend, onBotMessage, streamBotMessage, owner, repo}: ChatBoxProps) => {
    const [message, setMessage] = useState("")

    const handleSubmit = async () => {
        if (!message.trim()) return;

        const userMessage = message
        setMessage("")
        onSend(userMessage)
        onBotMessage("")
        
        //Send Post request to route
        const chatResponse = await fetch("/api/send-to-backend", {
            method: "POST", 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                prompt: message,
                owner: owner, 
                repo: repo, 

            })
        })

        if (chatResponse.status === 429) {
            alert("Too many requests")
            return
        }

        
        if (!chatResponse.body) {
            return
        }

        const reader = chatResponse.body.getReader()
        const decoder = new TextDecoder()

        let modelResponse = ""
        console.log("MODEL OUTPUT IS WOKRING")
        while (true) {
            const { done, value } = await reader.read()

            if (done) {
                break
            }

            const chunk = decoder.decode(value, {stream: true})

            modelResponse += chunk
            streamBotMessage(modelResponse)

        }


    }
    return (
        <div className="flex items-end gap-2 w-full p-2 border border-base-content/20 rounded-xl focus-within:border-primary focus-within:ring-1 focus-within:ring-primary bg-base-100">
            <textarea className="flex-1 min-h-[48px] p-2 bg-transparent resize-y outline-none focus:outline-none" placeholder="Ask Anything..." onChange = {(e) => setMessage(e.target.value)} value = {message} 
            onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    handleSubmit()
                }
            }
            }>
            </textarea>
            <button className="btn btn-primary btn-circle h-10 w-10 min-h-0 flex items-center justify-center shrink-0 mb-1" onClick={handleSubmit}> <ArrowUp size={18}/> </button>
        </div>
    )
    
}

export default ChatBox