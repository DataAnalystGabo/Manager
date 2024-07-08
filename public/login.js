const alertProcessing = document.getElementById('alertProcessing')
const spanProcessing  = document.getElementById('spanProcessing');


document.getElementById('loginForm').addEventListener('submit', function(e){
    e.preventDefault();

    const email    = e.target.email.value;
    const password = e.target.password.value;

    //Enviando datos al servidor
    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
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


    console.log(email, password);

});