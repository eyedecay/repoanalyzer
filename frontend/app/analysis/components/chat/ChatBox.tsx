"use client"
import { ArrowUp } from "lucide-react"
import { useState } from "react"

const ChatBox = () => {
    const [message, setMessage] = useState("")

    const handleSubmit = () => {
        if (!message.trim()) return;

        setMessage("")
    }
    return (
        <div className="flex items-end gap-2 w-full max-w-2xl p-2 border border-base-content/20 rounded-xl focus-within:border-primary focus-within:ring-1 focus-within:ring-primary bg-base-100">
            <textarea className="w-full flex-1 min-h-[48px] p-2 bg-transparent resize-y outline-none focus:outline-none" placeholder="Ask Anything..." onChange = {(e) => setMessage(e.target.value)} value = {message}></textarea>
            <button className="btn btn-primary btn-circle h-10 w-10 min-h-0 flex items-center justify-center shrink-0 mb-1" onClick={handleSubmit}> <ArrowUp size={18}/> </button>
        </div>
    )
    
}

export default ChatBox