interface Message {
    role: "user" | "chatbot",
    content: string
}
interface MessagesProps {
    messages: Message[]
}

const Messages = ({messages}: MessagesProps) => {
    return (
        <div>
            {messages.map((message, index) => (
                <div key = {index} className = {`chat ${message.role === "user" ? "chat-end": "chat-start"}`}>
                    <div className = "chat-bubble">{message.content}</div>
                </div>
            ))}
        </div>
    )
}

export default Messages