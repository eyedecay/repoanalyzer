import React from "react"

const LOW_THRESHOLD = 3 
const MEDIUM_THRESHOLD = 5
const HIGH_THRESHOLD = 8

interface CommitHistory {
    commitHistory: Record<string, number>
}

const ContributionGraph = ( {commitHistory} : CommitHistory) => {

    function createCalendar(year: number) {
        const calendar = Array.from({length:7}, () => Array(53).fill(null))

        const startDay = new Date(year, 0, 1).getDay()
        const daysInYear = year % 4 === 0 ? 366 : 365


        for (let day = 1; day <= daysInYear; day++) {
            const date = new Date(year, 0, day)
            const dateString = date.toISOString().split("T")[0]

            const commits = commitHistory[dateString] ?? 0

            const weekDay = date.getDay()

            const week = Math.floor((day + startDay -1) / 7)

            calendar[weekDay][week] = {
                date: dateString, 
                commits
        }
    }
    return calendar
    }
    function getIntensity(commits: number) {
        let colour = ""
        if (commits === 0) {
            colour = "bg-gray-200"
        } else if (commits <= LOW_THRESHOLD) {
            colour = "bg-yellow-200"
        } else if (commits <= MEDIUM_THRESHOLD) {
            colour = "bg-orange-200"
        } else if (commits <= HIGH_THRESHOLD) {
            colour = "bg-red-200"
        } else {
            colour = "bg-purple-500"
        }
        return colour
    }

    

    let currentDate = new Date().toISOString(); 
    currentDate = currentDate.split("T")[0]

    // Get earliest year to show history from
    let earliestCommitYear = Number(Object.keys(commitHistory)[0].split("-")[0])
    let currentYear = new Date().getFullYear()

    let calendars: Record<number, ({date: string, commits:number} |null)[][]> = {}

    while (earliestCommitYear <= currentYear) {
        calendars[earliestCommitYear] = (createCalendar(earliestCommitYear))
        earliestCommitYear++
    } 
    console.log(calendars)


    return (
        <div className="max-h-[130px] overflow-y-scroll snap-y snap-mandatory">
            {
                Object.entries(calendars).map(([year, calendar]) => (
                    <div key = {year} className = "snap-start h-[130px]">
                    <div className = "flex gap-4 mb-2">
                        <div className = "font-bold"> Commit History: {year}</div>
                    </div>
                    <table>
                        <tbody>
                            {
                                calendar.map((row, rowIndex) => (
                                    <tr key = {rowIndex}>
                                        {
                                            row.map((fullCommitInfo, colIndex) => (
                                                fullCommitInfo ? (
                                                    <td key = {colIndex} title = {`${fullCommitInfo.date}: ${fullCommitInfo.commits} commit${fullCommitInfo.commits === 1 ? "" : "s"}`} className = {`w-3 h-3 p-0 border ${getIntensity(fullCommitInfo.commits)}`}></td>
                                                ) : (
                                                    <td key = {colIndex} className = "w-3 h-3 p-0"></td>
                                                )
                                            ))
                                        }
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    </div>
                ))
            }
            
                                                  
            
        </div>
    )
}

export default ContributionGraph