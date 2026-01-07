function validateLogin(event) {
    let isValid = true;
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');

    
    emailError.textContent = '';
    passwordError.textContent = '';
    email.style.borderColor = '';
    password.style.borderColor = '';

    
    if (!email.value.trim()) {
        emailError.textContent = 'Email is required';
        email.style.borderColor = 'red';
        isValid = false;
    } else if (!email.value.includes('@')) {
        emailError.textContent = 'Email must include @';
        email.style.borderColor = 'red';
        isValid = false;
    }

    
    if (!password.value) {
        passwordError.textContent = 'Password is required';
        password.style.borderColor = 'red';
        isValid = false;
    } else if (password.value.length < 6) {
        passwordError.textContent = 'Password must be at least 6 characters';
        password.style.borderColor = 'red';
        isValid = false;
    }

    if (!isValid) {
        event.preventDefault();
    }
}

document.getElementById('loginForm').addEventListener('submit', validateLogin);


document.getElementById('email').addEventListener('input', () => {
    document.getElementById('emailError').textContent = '';
    document.getElementById('email').style.borderColor = '';
});

document.getElementById('password').addEventListener('input', () => {
    document.getElementById('passwordError').textContent = '';
    document.getElementById('password').style.borderColor = '';
});

// Load additional scripts
function loadScript(src) {
    const script = document.createElement('script');
    script.src = src;
    document.head.appendChild(script);
}

loadScript('../js/formSave.js');