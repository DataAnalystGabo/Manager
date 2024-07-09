import { calculateAge } from './calculateAge.js';
import { showAlert } from '../utils/showAlert.js';
import { inputs, resetInputStyle, validateForm } from './validatorInputs.js';

const inputBirthdate  = document.getElementById('birthdate');
const labelAge        = document.getElementById('ageLabel');
const form            = document.getElementById('form');

//Calculando la edad del usuario para la etiqueta labelAge.
inputBirthdate.addEventListener('change', function() {
    const age = calculateAge(this.value);
    labelAge.innerText = `${age} años`;
});

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
            //Enviando datos al servidor
            fetch('http://localhost:3000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({firstName, lastName, birthdate, age, email, password})
            })
            .then(async response => {
                if(!response.ok) {
                    const text = await response.text();
                    throw new Error(text);
                }
                return response.text();
            })
            .then(data => {
                //Alerta: Registro exitoso
                showAlert(data, 'success');

                //Reset del form
                form.reset();
                inputs.forEach(input => {
                    resetInputStyle(input.element, input.label);
                });

                //Redirigiedo al usuario
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 3000);
            })
            .catch(error => {
                //Alerta: Error de servidor
                showAlert(error, 'error');
            });
        }else{
            //Alerta: Error de no coincidencias de contraseñas
            showAlert('¡Las contraseñas ingresadas no coinciden!', 'error');
        };  
    } else {
        //Alerta: Error falta completar campos
        showAlert('¡Uno o más campos no fueron completados!', 'error');
    };
});
