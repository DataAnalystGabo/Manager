import { showAlert } from "../utils/showAlert.js";

const form = document.getElementById('form');

form.addEventListener('submit', function(e) {
    e.preventDefault();

    const email    = e.target.email.value;
    const password = e.target.password.value;

    if (email && password) {
        
        fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        })
        .then(async response => {
            if(!response.ok) {
                const text = await response.text();
                throw new Error(text);
            }
            return response.text();
        })
        .then(data => {
            showAlert(data, 'success');
        })
        .catch(error => {
            showAlert(error, 'error');
        });

    } else {
        showAlert('¡Debes ingresar un email y una contraseña!', 'error');
    }
});
