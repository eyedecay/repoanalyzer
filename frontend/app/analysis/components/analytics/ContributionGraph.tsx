

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

            calendar[weekDay][week] = commits
        }
        return calendar
    }

    let currentDate = new Date().toISOString(); 
    currentDate = currentDate.split("T")[0]
    console.log(currentDate)

    console.log(commitHistory)

    // Get earliest year to show history from
    let earliestCommitYear = Number(Object.keys(commitHistory)[0].split("-")[0])
    console.log(earliestCommitYear)
    let currentYear = new Date().getFullYear()

    let calendars: Record<number, (number |null)[][]> = {}

    while (earliestCommitYear <= currentYear) {
        calendars[earliestCommitYear] = (createCalendar(earliestCommitYear))
        earliestCommitYear++
    } 
    console.log(calendars)


    

    return (
        <div>
            Hi
        </div>
    )
}

export default ContributionGraph