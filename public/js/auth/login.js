import { showAlert } from "../helpers/showAlert.js";

const form = document.getElementById('form');

form.addEventListener('submit', function(e) {
    e.preventDefault();

    const email    = e.target.email.value;
    const password = e.target.password.value;
    if (email && password) {
        
        fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        })
        .then(async response => response.json())
        .then(data => {
            if(data.success) {
                window.location.href = 'dashboard.html'; // Redirige al dashaboard
            } else {
                showAlert(data.message, 'error');
            }
        })
        .catch(error => {
            showAlert(error, 'error');
        });

    } else {
        showAlert('¡Debes ingresar un email y una contraseña!', 'error');
    }
});
