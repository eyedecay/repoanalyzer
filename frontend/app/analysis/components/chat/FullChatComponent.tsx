"use client"
import { useState } from "react"
import ChatBox from "./ChatBox"
import Messages from "./Messges"

interface Message {
    role: "user" | "chatbot"
    content: string
}

const FullChatComponent = () => {
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
            <ChatBox onSend = {addUserMessage} onBotMessage = {addBotMessage}/>
        </div>
    )
}

export default FullChatComponent