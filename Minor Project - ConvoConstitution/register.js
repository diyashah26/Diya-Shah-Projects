function validateForm() {
    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();
    const errorMessage = document.getElementById('error-message');

    
    errorMessage.textContent = '';

    
    if (fullName === '' || email === '' || password === '' || confirmPassword === '') {
        errorMessage.textContent = 'All fields are required.';
        return false;
    }

    
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!email.match(emailPattern)) {
        errorMessage.textContent = 'Please enter a valid email address.';
        return false;
    }

    
    if (password.length < 6) {
        errorMessage.textContent = 'Password must be at least 6 characters long.';
        return false;
    }

    
    if (password !== confirmPassword) {
        errorMessage.textContent = 'Passwords do not match.';
        return false;
    }

    alert('Registration successful!');
    return true;

    
}


