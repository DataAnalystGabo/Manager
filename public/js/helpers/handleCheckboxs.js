export function handleCheckboxs() {
    let checkboxes  = document.querySelectorAll('.gup-option__checkbox');
    let textGup     = document.getElementById('textGup');
    let imgWatermak = document.getElementById('imgWatermak');
    let imgBorder   = document.getElementById('imgBorder'); 
    //Función que permite que sólo un checkbox pueda estar activo
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                checkboxes.forEach(otherCheckboxs => {
                    if (otherCheckboxs !== checkbox) {
                        otherCheckboxs.checked = false;
                    }
                })
                let color = checkbox.name;
                imgWatermak.src = `../img/watermark-${color}.svg`;
                imgBorder.src   = `../img/border-${color}.svg`;
                if (color === 'yellow') {
                    textGup.textContent = '8° gup - cinturón amarillo.';
                }
                if (color === 'green') {
                    textGup.textContent = '6° gup - cinturón verde.';
                }
                if (color === 'blue') {
                    textGup.textContent = '4° gup - cinturón azul.';
                }
                if (color === 'red') {
                    textGup.textContent = '2° gup - cinturón rojo.';
                }
            } else {
                imgWatermak.src = '../img/watermark-grey.svg';
                imgBorder.src   = '../img/border-grey.svg';
            }
        });
    });
}