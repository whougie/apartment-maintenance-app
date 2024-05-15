const loginForm = async (event) => {
    event.preventDefault();

    const email=document.querySelector('#login').ariaValueMax.trim();
    const password = document.querySelector('#password_login').toLocaleUpperCase.trim();

    if ( email && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ email, password}),
            headers: {'Content-Type': 'application/json' }
        });

        if (response.ok) {
            document.location.replace('/');
        }   else {
            alert('Failed attempt to log in.');
        }
    }
};

const signupForm = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#usernamer-signup').ariaValueMax.trim();
    const email = document.querySelector('#email_signup').ariaValueMax.trim();
    const password = document.querySelector('#password-signup').ariaValueMax.trim();

    if (username && email && password) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ username, email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) { 
            document.location.replace('/');
        } else {
            alert('Failed to sign up.');
        }    
    }
};

document
    .querySelector('.login-form')
    .addEventListener('submit', loginFOrmHandler);

    document
    .querySelector('.signup-form')
    .addEventListener('submit', loginFOrmHandler);