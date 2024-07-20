import { showAlert } from '../helpers/showAlert.js';
import { buttonSubmit } from '../components/buttonSubmit.js';

const form = document.getElementById('form');

form.addEventListener('submit', function(e) {
    e.preventDefault();

    const email    = e.target.email.value;
    const password = e.target.password.value;
    if (email && password) {
        buttonSubmit('Procesando', 'loading');
        //Enviando datos al servidor
        fetch(window.location.hostname === '127.0.0.1'
            ? 'http://localhost:3000/api/auth/login'
            : 'https://manager-8h85.onrender.com/api/auth/register', 
            {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        })
        .then(async response => response.json())
        .then(data => {
            if(data.success) {
                window.location.href = 'certificateBuilder.html'; // Redirige al dashaboard
            } else {
                showAlert(data.message, 'error');
                buttonSubmit('Ingresar', 'enabled');
            }
        })
        .catch(error => {
            showAlert(error, 'error');
            buttonSubmit('Ingresar', 'enabled');
        });
    } else {
        showAlert('¡Debes ingresar un email y una contraseña!', 'error');
    }
});
