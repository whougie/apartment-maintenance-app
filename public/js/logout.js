const logout = document.querySelector("#logout")

async function logoutHandler() {
    await fetch ("/api/account/logout", {
        method: "POST" 
    })
    document.location.replace("/login")
}



    logout.addEventListener('click', logoutHandler)



