const inputBirthdate  = document.getElementById('birthdate');
const labelAge        = document.getElementById('ageLabel');
const registerForm    = document.getElementById('registerForm');
const formSpan        = document.getElementById('formSpan');


//Calcular la edad del usuario
function calculateAge(input){
    const birthdate  = new Date(input);
    const today      = new Date();
    let age          = today.getFullYear() - birthdate.getFullYear();
    const monthDiff  = today.getMonth() - birthdate.getMonth();

    if(monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthdate.getDate())){
        age--;
    }
    return age;
};


//Calculando la edad del usuario
inputBirthdate.addEventListener('change', function() {
    const age = calculateAge(this.value);
    labelAge.innerText = `${age} años`
});


//Setear el formato de presentación del input date
inputBirthdate.addEventListener('focus', function(){
    if(this.value){
        const [year, month, day] = this.value.split('-');

        if(year && month && day){
            this.type = 'date';
            this.value = `${day}/${month}/${year}`;
        }
        
    } else{
        this.type = 'date';
    }
});


inputBirthdate.addEventListener('blur', function(){
    if(this.value){
        const [year, month, day] = this.value.split('-');

        if(year && month && day){
            this.type = 'text';
            this.value = `${day}/${month}/${year}`;
        }
        
    } else{
        this.type = 'text';
    }
});


//Capturamos los datos enviados por el usuario
registerForm.addEventListener('submit', function(e){
    e.preventDefault();

    const firstName  = e.target.firstName.value;
    const lastName   = e.target.lastName.value;
    const birthdate  = e.target.birthdate.value;
    const age        = calculateAge(birthdate);
    const email      = e.target.email.value;
    const password   = e.target.password.value;
    const rePassword = e.target.rePassword.value

    //Enviando datos al servidor
    fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({firstName, lastName, birthdate, age, email, password, rePassword})
    })
    .then(response => response.text())
    .then(data => {

        //mostrar alerta
        alertProcessing.style.display = 'flex';
        
        //mostrar mensaje en alerta
        spanProcessing.innerText = data

        //eliminar los datos ingresados en los inputs
        e.target.reset();

    })
    .catch(error => {
        console.error('Error: ', error);
    });

});