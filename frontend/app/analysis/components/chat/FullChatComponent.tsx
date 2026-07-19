"use client"
import { useState } from "react"
import ChatBox from "./ChatBox"
import Messages from "./Messges"

interface Message {
    role: "user" | "chatbot"
    content: string
}

interface ChatProps {
    owner: string, 
    repo: string
}
const FullChatComponent = ({owner, repo}: ChatProps) => {
    const [messages, setMessages] = useState<Message[]>([])

    const addUserMessage = (message: string) => {
        setMessages(prev => [...prev, {
            role: "user",
            content: message
        }, 
        
    ])}

    const addBotMessage = (aiResponse: string) => {
        setMessages(prev => [...prev, {
            role: "chatbot",
            content: aiResponse
        }, 
        
    ])}
    return (
        <div className = "w-full h-[400px] flex flex-col">
            <div className = "flex-1 overflow-y-auto">
                <Messages messages = {messages}/>
            </div>
            <ChatBox onSend = {addUserMessage} owner={owner} repo = {repo} onBotMessage = {addBotMessage}/>
        </div>
    )
}

export default FullChatComponent