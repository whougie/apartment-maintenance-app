


const submitMessage = document.querySelector('.submit-message')


async function formPopulate(event) {
    try {
        event.preventDefault();
        const room = document.querySelector('#room').value
        const issue = document.querySelector('#broken-thing').value
        console.log(issue, date, room)

        const response = await fetch('/api/issue', {
            method: 'POST',
            body: JSON.stringify({ date, issue, room }),
            headers: { 'Content-Type': 'application/json' }
        })
        if (response.ok) {
            submitMessage.textContent = "Issue submitted! Return to homepage to view progress!"
        } else {
            throw new Error("error")
        }
    } catch (error) {
        submitMessage.textContent = "Your apartment isn't the only thing on fire!"
    }

}



const buttonSubmit = document.querySelector('.form-group')

buttonSubmit.addEventListener('submit', formPopulate);