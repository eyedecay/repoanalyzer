import { ArrowUp } from "lucide-react"

const ChatBox = () => {
    return (
        <>
            <textarea className="textarea" placeholder="Ask Anything..."></textarea>
            <button className = "btn btn-primary btn-circle"> <ArrowUp/> </button>
        </>
    )
    
}

export default ChatBox