import ollama


response = ollama.chat(
    model = "llama3.2:3b",
    messages = [
        {
            "role": "user", 
            "content": "Explain what RAG is (Retrieval Augmented Generation)"
        }
    ]
)

print(response["message"]["content"])