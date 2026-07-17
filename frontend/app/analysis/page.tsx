import Stars from "./components/analytics/Stars"

interface PageProps {
    searchParams: Promise <{owner?:string; repo?:string}>;
}


const Analytics = async ( {searchParams}: PageProps) => {

    const {owner, repo} = await searchParams


    const response = await fetch(`http://localhost:3001/api/check-repo?owner=${owner}&repo=${repo}&metrics=true`)
    const repoData = await response.json()

    return (
        <>
            <Stars value = {repoData.stars}/>
        </>
    )
}


export default Analytics