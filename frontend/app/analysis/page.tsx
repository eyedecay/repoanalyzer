import Stars from "./components/analytics/Stars"
import { getRepoMetrics } from "../lib/githubFetch";

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
            <Stars value = {repoData.stars}/>
        </>
    )
}

export default Analytics