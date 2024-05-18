

const activeIssue = document.querySelector("#active-issue")
const completedIssue = document.querySelector("#completed-issue")

async function populateIssues() {
    const response = await fetch("/api/issues")
    const data = await response.json()
        console.log(data)
        for (let i = 0; i < data.length; i++) {
            const issue = data.results[i]
            const divTag = document.createElement("div")
            const h4Tag = document.createElement("h4")
            const pTag = document.createElement("p")
            const dTag = document.createElement("p")
            h4Tag.textContent = issue.room
            pTag.textContent = issue.issue
            divTag.appendChild(h4Tag)
            pTag.appendChild(h4Tag)
            if(issue.active) {
                activeIssue.appendChild(divTag);
            } else {
                completedIssue.appendChild(divTag);
            }
            
            
        }

}

// populateIssues()