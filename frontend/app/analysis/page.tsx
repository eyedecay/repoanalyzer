import Stars from "./components/analytics/Stars"
import { getRepoMetrics } from "../lib/githubFetch";
import Language from "./components/analytics/Language"

interface PageProps {
    searchParams: Promise <{owner?:string; repo?:string}>;
}


const Analytics = async ( {searchParams}: PageProps) => {

    const {owner, repo} = await searchParams

    if (owner === undefined || repo === undefined) {
        return <div> Missing Repo Info</div>
    }

    const repoData = await getRepoMetrics(owner, repo)

    return (
        <>
            <Stars stars = {repoData.stars}/>
            <Language language = {repoData.language}/>
        </>
    )
}

export default Analytics