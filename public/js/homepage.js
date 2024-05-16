

const activeIssue = document.querySelector("#active-issue")
const completedIssue = document.querySelector("#completed-issue")

async function populateIssues() {
    const response = await fetch("/api/issue")
    const data = await response.json()
        console.log(data)
        for (let i = 0; i < data.results.length; i++) {
            const issue = data.results[i]
            const divTag = document.createElement("div")
            const h4Tag = document.createElement("h4")
            const pTag = document.createElement("p")
            const dTag = document.createElement("p")
            h4Tag.textContent = issue.room
            pTag.textContent = issue.issue
            dTag.textContent = `schedule: ${issue.date_scheduled}`
            divTag.appendChild(h4Tag)
            pTag.appendChild(h4Tag)
            dTag.appendChild(h4Tag)
            if(issue.active) {
                activeIssue.appendChild(divTag);
            } else {
                completedIssue.appendChild(divTag);
            }
            
            
        }

}

populateIssues()