"use client"
import { useRouter } from 'next/navigation'
import { useState, Dispatch, SetStateAction } from "react"

interface AnalyzeButtonProps {
    repoUrl: string; 
    setError: Dispatch<SetStateAction<string>>
}
const AnalyzeButton = ( {repoUrl, setError}: AnalyzeButtonProps) => {

    const router = useRouter(); 
    const [loading, setLoading] = useState(false)

    const handleClick = async () => {
        setError("")

        //empty check
        const cleanUrl = repoUrl.replace(/\s+/g, "")
        if (!cleanUrl) {
            setError("Enter Something")
            return
        }

        //Check if its a valid git clone link (only url compatibility not actual existence)
        const githubRegex = /^https:\/\/github\.com\/[^\/]+\/[^\/]+(\.git)?$/
        if (!githubRegex.test(cleanUrl)) {
            setError("Enter Valid Git Clone link")
            setLoading(false)
            return
        }



        setLoading(true);

        try {
            //random regex
            const parts = cleanUrl.replace(/\.git$/, "").split('/');
            const repo = parts.pop()
            const owner = parts.pop()
            
            // Check if it actually exists
            const response = await fetch(`/api/check-repo?owner=${owner}&repo=${repo}`)
            if (!response.ok) {
                setError("Repo Not Found")
                setLoading(false)
                return
            }
            router.push(`/analysis?owner=${encodeURIComponent(owner!)}&repo=${encodeURIComponent(repo!)}`);
        } catch (err) {
            setError("Network Error")
            setLoading(false)
        }

        
    }
    return (
        <>
            <button onClick = {handleClick} className="btn btn-primary">
                Analyze Repo
            </button>
        </>

    );
};

export default AnalyzeButton
