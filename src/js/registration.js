function validateRegistration(event) {
    let isValid = true;
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const username = document.getElementById('username');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirm_password');
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const usernameError = document.getElementById('usernameError');
    const passwordError = document.getElementById('passwordError');
    const confirmError = document.getElementById('confirmError');
    const successMessage = document.getElementById('successMessage');

    
    nameError.textContent = '';
    emailError.textContent = '';
    usernameError.textContent = '';
    passwordError.textContent = '';
    confirmError.textContent = '';
    successMessage.textContent = '';
    name.style.borderColor = '';
    email.style.borderColor = '';
    username.style.borderColor = '';
    password.style.borderColor = '';
    confirmPassword.style.borderColor = '';

    
    if (!name.value.trim()) {
        nameError.textContent = 'Name is required';
        name.style.borderColor = 'red';
        isValid = false;
    }

    
    if (!email.value.trim()) {
        emailError.textContent = 'Email is required';
        email.style.borderColor = 'red';
        isValid = false;
    }

    
    if (!username.value.trim()) {
        usernameError.textContent = 'Username is required';
        username.style.borderColor = 'red';
        isValid = false;
    } else if (username.value.length < 3) {
        usernameError.textContent = 'Username must be at least 3 characters';
        username.style.borderColor = 'red';
        isValid = false;
    }

    
    if (!password.value) {
        passwordError.textContent = 'Password is required';
        password.style.borderColor = 'red';
        isValid = false;
    }

    
    if (!confirmPassword.value) {
        confirmError.textContent = 'Confirm password is required';
        confirmPassword.style.borderColor = 'red';
        isValid = false;
    } else if (password.value !== confirmPassword.value) {
        confirmError.textContent = 'Passwords do not match';
        confirmPassword.style.borderColor = 'red';
        isValid = false;
    }

    if (isValid) {
        successMessage.textContent = 'Registration successful!';
    } else {
        event.preventDefault();
    }
}

document.getElementById('registrationForm').addEventListener('submit', validateRegistration);


document.getElementById('name').addEventListener('input', () => {
    document.getElementById('nameError').textContent = '';
    document.getElementById('name').style.borderColor = '';
});

document.getElementById('email').addEventListener('input', () => {
    document.getElementById('emailError').textContent = '';
    document.getElementById('email').style.borderColor = '';
});

document.getElementById('username').addEventListener('input', () => {
    document.getElementById('usernameError').textContent = '';
    document.getElementById('username').style.borderColor = '';
});

document.getElementById('password').addEventListener('input', () => {
    document.getElementById('passwordError').textContent = '';
    document.getElementById('password').style.borderColor = '';
});

document.getElementById('confirm_password').addEventListener('input', () => {
    document.getElementById('confirmError').textContent = '';
    document.getElementById('confirm_password').style.borderColor = '';
});


document.getElementById('clearForm').addEventListener('click', () => {
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    document.getElementById('confirm_password').value = '';
    document.querySelectorAll('.error').forEach(el => el.textContent = '');
    document.getElementById('successMessage').textContent = '';
    document.querySelectorAll('input').forEach(inp => inp.style.borderColor = '');
});

// Load additional scripts
function loadScript(src) {
    const script = document.createElement('script');
    script.src = src;
    document.head.appendChild(script);
}

loadScript('./formSave.js');