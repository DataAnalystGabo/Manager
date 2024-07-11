const inputBirthdate  = document.getElementById('birthdate');

//Setear el formato de presentación del input date.
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