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

    const handleSend = (message: string) => {
        setMessages(prev => [...prev, {
            role: "user",
            content: message
        }])
    }
    return (
        <div className = "w-full h-[400px] flex flex-col">
            <div className = "flex-1 overflow-y-auto">
                <Messages messages = {messages}/>
            </div>
            <ChatBox onSend = {handleSend}/>
        </div>
    )
}

export default FullChatComponent