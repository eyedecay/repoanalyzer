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
            //random regex
            const parts = cleanUrl.replace(/\.git$/, "").split('/');
            const repo = parts.pop()
            const owner = parts.pop()

            const response = await fetch(`/api/check-repo?owner=${owner}&repo=${repo}&metrics=false`)
            if (!response.ok) {
                setError("Repo Not Found")
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
