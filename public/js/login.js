const loginForm = async (event) => {
    event.preventDefault();
    
    const email = document.querySelector('#login');
    const password = document.querySelector('#password-login');
    const managerCheckElement = document.querySelector('#managerCheck');
    
    
    if ( email.value && password.value) {
        
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
    } else {
        alert('Failed to login, please fill out all the fields')
    }
};

const signupForm = async (event) => {
    event.preventDefault();
    
    const name = document.querySelector('#username-signup');
    const email = document.querySelector('#email-signup');
    const password = document.querySelector('#password-signup');
    const aptNumber = document.querySelector('#aptNumber');
    const dept = document.querySelector('#dept');
    
    let response = null;
    
    if (dept.value === 'MStaff') {
        if (name.value && email.value && password.value) {
            
            response = await fetch('/api/account/manager', {
                method: 'POST',
                body: JSON.stringify({ manager_name: name.value, manager_email: email.value, manager_password: password.value }),
                headers: { 'Content-Type': 'application/json' },
            });
        } else {
            alert('Failed to signup, incorrect department entered');
        }
    } else {
        if (name.value && email.value && password.value && aptNumber.value) {
            response = await fetch('/api/account/tenant', {
                method: 'POST',
                body: JSON.stringify({ tenant_name: name.value, tenant_email: email.value, tenant_password: password.value, tenant_aptNumber: parseInt(aptNumber.value) }),
                headers: { 'Content-Type': 'application/json' },
            });   
        } else {
            alert('Failed to signup, not all fields filled out for tenant');
        }
    }
        

    if (response && response.ok) { 
        document.location.replace('/');
    } else {
        alert('Failed to sign up.');
    } 
};

document
.querySelector('.login-form')
.addEventListener('submit', loginForm);

document
.querySelector('.signup-form')
.addEventListener('submit', signupForm);