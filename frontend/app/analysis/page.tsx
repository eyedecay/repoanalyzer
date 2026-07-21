import Stars from "./components/analytics/Stars"
import { getCommitHistory, getRepoMetrics, checkRepoExistence  } from "../lib/githubFetch"
import Language from "./components/analytics/Language"
import FullChatComponent from "./components/chat/FullChatComponent";
import ContributionGraph from "./components/analytics/ContributionGraph";

import{ notFound } from "next/navigation"

interface PageProps {
    searchParams: Promise <{owner?:string; repo?:string}>;
}


const Analytics = async ( {searchParams}: PageProps) => {

    const {owner, repo} = await searchParams

    if (owner === undefined || repo === undefined) {
        return <div> Missing Repo Info</div>
    }

    // If user uses web link instead of normal typing
    const exists = await checkRepoExistence(owner, repo);
    if (!exists.ok) {
        notFound();
    }
    const sendDataForClone = await fetch("http://localhost:8000/clone", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            owner: owner,
            repo: repo
        })
    })

    if (!sendDataForClone.ok) {
        throw new Error("Cloning Repo Failed")
    }


    const storeVectorsinDB = await fetch("http://localhost:8000/store_vector", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            owner: owner,
            repo: repo
        })
    })


    const repoData = await getRepoMetrics(owner, repo)
    const commitHistory = await getCommitHistory(owner, repo)
    console.log(commitHistory)

    return (
        <div className = "max-w-4xl mx-auto px-6">
            <h1 className = "text-4xl font-bold text-center mb-8"> {repo} by {owner}</h1>
            <div className = "grid grid-cols-2 gap-6 mb-8 place-items-center">
                <Stars stars = {repoData.stars}/>
                <Language language = {repoData.language}/>
            </div>
            <div className = "w-full">
                <ContributionGraph commitHistory = {commitHistory}/>
            </div>
            <div className = "w-full">
                <FullChatComponent/>
            </div>
        </div>
    )
}

export default Analytics