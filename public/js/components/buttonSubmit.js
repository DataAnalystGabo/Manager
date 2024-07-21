export function buttonSubmit(textStart, textEnd, status) {
    let button     = document.getElementById('button-submit');
    let label      = document.getElementById('label-submit');
    let loading    = document.getElementById('loading-submit');
    let iconSkull  = document.getElementById('icon-skull');
    let iconHeart  = document.getElementById('icon-heart');

    if (status === 'loading') {
        button.classList.add('button-submit__disabled');
        loading.classList.add('button-submit__loading--active');
        label.textContent = textStart
    } else if (status === 'enabled') {
        button.classList.remove('button-submit__disabled');
        loading.classList.remove('button-submit__loading--active');
        label.textContent = textStart
    } else if (status === 'error') {
        loading.classList.remove('button-submit__loading--active');
        button.classList.remove('form__button');
        button.classList.add('button-submit__error');
        iconSkull.classList.add('button-submit__skull--visible');
        label.classList.add('button-submit__label--hidden');
        
        setTimeout(() => {
            button.classList.remove('button-submit__disabled');
            iconSkull.classList.remove('button-submit__skull--visible');
            label.classList.remove('button-submit__label--hidden');
            button.classList.remove('button-submit__error');
            button.classList.add('form__button');
            button.classList.add('button-submit');
            label.textContent = textEnd;
        }, 2000);
        
    } else if (status === 'success') {
        loading.classList.remove('button-submit__loading--active');
        button.classList.add('button-submit__success');
        iconHeart.classList.add('button-submit__heart--visible');
        label.classList.add('button-submit__label--hidden');

        setTimeout(() => {
            button.classList.remove('button-submit__disabled');
            iconHeart.classList.remove('button-submit__heart--visible');
            label.classList.remove('button-submit__label--hidden');
            button.classList.remove('button-submit__success');
            button.classList.add('button-submit');
            label.textContent = textEnd;
        }, 2000);
    }
};