"use client"
import { useState } from "react"
import AnalyzeButton from "./AnalyzeButton"
import InputBox from "./InputBox"

const InputCard = () => {
    const [repoUrl, setRepoUrl] = useState("")
    return (
        <>
            <div className = "join w-full max-w-sm shadow-2xl">
                <InputBox value = {repoUrl} onChange = {setRepoUrl}/>
                <AnalyzeButton repoUrl = {repoUrl}/>
            </div>
        </>
    )
}

export default InputCard