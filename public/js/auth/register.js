import { calculateAge } from '../helpers/calculateAge.js';
import { showAlert } from '../helpers/showAlert.js';
import { inputs, resetInputStyle, validateForm } from '../helpers/validatorInputs.js';
import { buttonSubmit } from '../components/buttonSubmit.js';

const inputBirthdate  = document.getElementById('birthdate');
const labelAge        = document.getElementById('ageLabel');
const form            = document.getElementById('form');

//Calculando la edad del usuario para la etiqueta labelAge.
inputBirthdate.addEventListener('change', function() {
    const age = calculateAge(this.value);
    labelAge.innerText = `${age} años`;
});


//--DEBUG en produ
console.log(window.location.hostname);

//Capturamos los datos enviados por el usuario
form.addEventListener('submit', function(e){
    e.preventDefault();
    if (validateForm()) {
        const firstName  = e.target.firstName.value;
        const lastName   = e.target.lastName.value;
        const birthdate  = e.target.birthdate.value;
        const age        = calculateAge(birthdate);
        const email      = e.target.email.value;
        const password   = e.target.password.value;
        const rePassword = e.target.rePassword.value;
        if(password === rePassword){
            buttonSubmit('Procesando', '', 'loading');
            //Enviando datos al servidor
            fetch(
                window.location.hostname === '127.0.0.1'
                ? 'http://localhost:3000/api/auth/register'
                : 'https://manager-8h85.onrender.com/api/auth/register', 
                {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({firstName, lastName, birthdate, age, email, password})
            })
            .then(async response => response.json())
            .then(data => {
                if (data.success) {
                    showAlert(data.message, 'success');
                    buttonSubmit('', 'Registrarme', 'success');

                    //Reset del form
                    form.reset();
                    inputs.forEach(input => {
                    resetInputStyle(input.element, input.label);
                    });
                    
                    //Redirigiedo al usuario
                    setTimeout(() => {
                        window.location.href = 'login.html';
                    }, 5000);
                } else {
                    showAlert(data.message, 'error');
                    buttonSubmit('', 'Registrarme', 'enabled');
                }
            })
            .catch(error => {
                //Alerta: Error de servidor
                showAlert(error, 'error');
                buttonSubmit('', 'Registrarme', 'error');
            });
        }else{
            //Alerta: Error las contraseñas no coinciden
            showAlert('¡Las contraseñas ingresadas no coinciden!', 'error');
        };  
    } else {
        //Alerta: Error falta completar campos
        showAlert('¡Uno o más campos no fueron completados!', 'error');
    };
});
