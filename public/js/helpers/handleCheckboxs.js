export function handleCheckboxs() {
    const checkboxes    = document.querySelectorAll('.gup-option__checkbox');
    const imgBackground = document.getElementById('imgBackground');
    const imgBorder     = document.getElementById('imgBorder');
    const textGup       = document.getElementById('textGup');
    
    //Función que permite que sólo un checkbox pueda estar activo
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                checkboxes.forEach(otherCheckboxs => {
                    if (otherCheckboxs !== checkbox) {
                        otherCheckboxs.checked = false;
                    }
                })
                let color         = checkbox.name;
                imgBorder.src     = `/public/img/border-${color}.svg`;
                imgBackground.src = `/public/img/background-logo-academia-${color}.svg`
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
                imgBorder.src     = '';
                imgBackground.src = '';
            }
        });
    });
}