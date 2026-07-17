"use client"
import { useState } from "react"
import AnalyzeButton from "./AnalyzeButton"
import InputBox from "./InputBox"

const InputCard = () => {
    const [repoUrl, setRepoUrl] = useState("")
    return (
        <>
        <div>
            <h1 className = "text-4xl font-bold text-center mb-5"> RepoAnalyzer</h1>
            <div className = "join w-full max-w-sm shadow-2xl">
                <InputBox value = {repoUrl} onChange = {setRepoUrl}/>
                <AnalyzeButton repoUrl = {repoUrl}/>
            </div>
        </div>
        </>
    )
}

export default InputCard