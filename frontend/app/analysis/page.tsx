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
        <>
            <h1 className = "text-4xl font-bold text-center mb-5"> {repo} by {owner}</h1>
            <Stars stars = {repoData.stars}/>
            <Language language = {repoData.language}/>
            <ContributionGraph commitHistory = {commitHistory}/>
            <FullChatComponent/>
        </>
    )
}

export default Analytics