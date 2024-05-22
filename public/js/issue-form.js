const submitMessage = document.querySelector('.submit-message')

async function formPopulate(event) {
    event.preventDefault();
    if(event.target===buttonSubmit) {
        try {
            const room = document.querySelector('#room').value
            const issue = document.querySelector('#broken-thing').value
            const response = await fetch('/api/issues', {
                method: 'POST',
                body: JSON.stringify({ issue, room }),
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
}

const buttonSubmit = document.querySelector('.submit-form')

buttonSubmit.addEventListener('submit', formPopulate);
