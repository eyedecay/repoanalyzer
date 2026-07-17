"use client"
import { useRouter } from 'next/navigation'
import { useState } from "react"

interface AnalyzeButtonProps {
    repoUrl: string; 
}
const AnalyzeButton = ( {repoUrl}: AnalyzeButtonProps) => {

    const router = useRouter(); 
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const handleClick = async () => {
        setError("")

        const cleanUrl = repoUrl.replace(/\s+/g, "")
        if (!cleanUrl) {
            setError("Enter Valid Git Clone link")
            return
        }
        setLoading(true);

        try {
            const parts = cleanUrl.replace(/\.git$/, "").split('/');
            const repo = parts.pop()
            const owner = parts.pop()

            const response = await fetch(`https://github.com/${owner}/${repo}`)
            if (response.status === 404) {
                setError("Repo Not Found")
                console.log("Success")
                setLoading(false)
                return
            }
            router.push(`/analysis?repo=${encodeURIComponent(cleanUrl)}`);
        } catch (err) {
            setError("Network Error")
            setLoading(false)
        }

        
    }
    return (
        <button onClick = {handleClick} className="btn btn-primary">
            Analyze Repo
        </button>
    );
};

export default AnalyzeButton
