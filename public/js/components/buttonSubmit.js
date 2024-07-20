export function buttonSubmit(text, status) {
    let button     = document.getElementById('button-submit');
    let label      = document.getElementById('label-submit');
    let loading    = document.getElementById('loading-submit');
    let iconSkull  = document.getElementById('iconSkull');
    let iconHeart  = document.getElementById('iconHeart');
    if (status === 'loading') {
        button.classList.add('button__disabled');
        loading.classList.add('button__loading--active');
        label.textContent = text
    } else if (status === 'enabled') {
        button.classList.remove('button__disabled');
        loading.classList.remove('button__loading--active');
        label.textContent = text
    } else if (status === 'error') {
        loading.classList.remove('button__loading--active');
        button.classList.remove('form__button');
        button.classList.add('button__error');
        iconSkull.classList.add('button__skull--visible');
        label.classList.add('button__label--hidden');
        
        setTimeout(() => {
            button.classList.remove('button__disabled');
            iconSkull.classList.remove('button__skull--visible');
            label.classList.remove('button__label--hidden');
            button.classList.remove('button__error');
            button.classList.add('form__button');
            button.classList.add('button');
            label.textContent = 'Registrarme'
        }, 2000);
        
    } else if (status === 'success') {
        loading.classList.remove('button__loading--active');
        button.classList.remove('form__button');
        button.classList.add('button__success');
        iconHeart.classList.add('button__heart--active');
        label.classList.add('button__label--hidden');
    }
};