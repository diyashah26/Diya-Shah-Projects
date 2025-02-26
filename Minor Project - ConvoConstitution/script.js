import { getAuth, signOut } from "firebase/auth";
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var terms = document.getElementById('terms').checked;
    var errorDiv = document.getElementById('error');

    
    errorDiv.textContent = '';

    
    if (email === '' || password === '') {
        errorDiv.textContent = 'Both fields are required.';
        return;
    }

    if (!email.includes('@')) {
        errorDiv.textContent = 'Please enter a valid email address.';
        return;
    }

    if (!terms) {
        errorDiv.textContent = 'You must agree to the terms and conditions.';
        return;
    }

    
    alert('Login successful!'); 

   
});

const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();


document.getElementById('logoutButton').addEventListener('click', () => {
    signOut(auth).then(() => {
        console.log('Logged out');
        window.location.href = '/login'; // Redirect to login page
    }).catch((error) => {
        console.error('Error signing out:', error);
    });

    alert("Logged out successfully!");
});
