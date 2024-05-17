const loginForm = async (event) => {
    event.preventDefault();
    
    const email = document.querySelector('#login');
    const password = document.querySelector('#password-login');
    const managerCheckElement = document.querySelector('#managerCheck');
    
    
    if ( email.value && password.value) {
        console.log("email " + email.value + " password is " + password.value)
        
        let response = null; 
        if (managerCheckElement.checked) {
            response = await fetch('/api/account/manager/login', {
                method: 'POST',
                body: JSON.stringify({ manager_email: email.value, manager_password: password.value}),
                headers: {'Content-Type': 'application/json' }
            })
        } else {
                response = await fetch('/api/account/tenant/login', {
                method: 'POST',
                body: JSON.stringify({ tenant_email: email.value, tenant_password: password.value}),
                headers: {'Content-Type': 'application/json' }
            })
        }
        
        
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
// .addEventListener('submit', loginFOrmHandler);
.addEventListener('submit', loginForm);

document
.querySelector('.signup-form')
.addEventListener('submit', signupForm);