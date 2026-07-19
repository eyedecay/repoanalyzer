import Stars from "./components/analytics/Stars"
import { getCommitHistory } from "../lib/githubFetch"
import { getRepoMetrics } from "../lib/githubFetch";
import Language from "./components/analytics/Language"
import FullChatComponent from "./components/chat/FullChatComponent";
import ContributionGraph from "./components/analytics/ContributionGraph";

interface PageProps {
    searchParams: Promise <{owner?:string; repo?:string}>;
}


const Analytics = async ( {searchParams}: PageProps) => {

    const {owner, repo} = await searchParams

    if (owner === undefined || repo === undefined) {
        return <div> Missing Repo Info</div>
    }

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