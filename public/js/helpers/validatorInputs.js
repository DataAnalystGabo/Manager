const inputFirstName  = document.getElementById('firstName');
const inputLastName   = document.getElementById('lastName');
const inputEmail      = document.getElementById('email');
const inputPassword   = document.getElementById('password');
const inputRePassword = document.getElementById('rePassword');
const inputBirthdate  = document.getElementById('birthdate');
const labelFirstName  = document.getElementById('firstNameLabel');
const labelLastName   = document.getElementById('lastNameLabel');
const labelEmail      = document.getElementById('emailLabel');
const labelPassword   = document.getElementById('passwordLabel');
const labelRePassword = document.getElementById('rePasswordLabel');
const labelBirthdate  = document.getElementById('birthdateLabel');

const regexPatterns = {
    firstName: /^[A-Za-z\s]+$/,
    lastName: /^[A-Za-z\s]+$/,
    birthdate: /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
};

const inputs = [
    { element: inputFirstName, pattern: regexPatterns.firstName, label: labelFirstName },
    { element: inputLastName, pattern: regexPatterns.lastName, label: labelLastName },
    { element: inputBirthdate, pattern: regexPatterns.birthdate, label: labelBirthdate },
    { element: inputEmail, pattern: regexPatterns.email, label: labelEmail },
    { element: inputPassword, pattern: regexPatterns.password, label: labelPassword },
    { element: inputRePassword, pattern: regexPatterns.password, label: labelRePassword }
];

const validateInput = (input, pattern, label) => {
    if (input.value.trim() === '') {
        input.style.borderColor = '#e56b6f';
        input.style.color       = '#e56b6f';
        label.style.color       = '#e56b6f';
        return false;
    } else if (pattern.test(input.value)) {
        input.style.borderColor = '#52b788';
        input.style.color       = '#52b788';
        label.style.color       = '#52b788';
        return true;
    } else {
        input.style.borderColor = '#e56b6f';
        input.style.color       = '#e56b6f';
        label.style.color       = '#e56b6f';
        return false;
    }
};

const resetInputStyle = (input, label) => {
    input.style.borderColor = '';
    input.style.color       = '';
    label.style.color       = '';
};

const validateForm = () => {
    let isValid = true;
    inputs.forEach(input => {
        if (!validateInput(input.element, input.pattern, input.label)) {
            isValid = false;
        }
    });
    return isValid;
};

inputs.forEach(input => {
    ['input', 'change', 'blur', 'keydown'].forEach(event => {
        input.element.addEventListener(event, function() {
            if (event === 'blur' && !this.value) {
                resetInputStyle(this, input.label);
            } else {
                validateInput(this, input.pattern, input.label);
            }
        });
    });
});

export {
    inputFirstName,
    inputLastName,
    inputBirthdate,
    inputEmail,
    inputPassword,
    inputRePassword,
    labelFirstName,
    labelLastName,
    labelBirthdate,
    labelEmail,
    labelPassword,
    labelRePassword,
    regexPatterns,
    inputs,
    validateInput,
    resetInputStyle,
    validateForm
};
