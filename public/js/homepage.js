async function completeIssue(event) {
    if (event.target.matches(".completeIssue")) {
        await fetch(`/api/issues/${event.target.id}`, {method:"PUT"})
        document.location.reload()
    }
}
async function archiveIssue(event) {
    if (event.target.matches(".deleteIssue")) {
        await fetch(`/api/issues/${event.target.id}`, {method:"DELETE"})
        document.location.reload()
    }
}

document
    .querySelector('#active-issues')
    .addEventListener('click', completeIssue);

document
    .querySelector('#completed-issues')
    .addEventListener('click', archiveIssue);