const form = document.getElementById('register');

const usernameLength = form.querySelector('label[for=username] span');
const password = form.querySelector('input[type=password]#password');
const confirmPassword = form.querySelector('input[type=password]#confirm-password');

function checkInputValidity (input) {
    console.log(input.id)
    let valid = true;
    let errorMessage = undefined;
    switch (input.id) {
        case 'username': {
            valid = input.checkValidity();
            updateUsernameLength(input);
            break;
        } 
        case 'email': {
            valid = input.checkValidity();
            break;
        }
        case 'password': {
            valid = isPasswordValid();
            errorMessage = 'Password must be at least 8 characters long, contain a number and at least 1 capital letter';
            break;
        }
        case 'confirm-password': {
            valid = isPasswordConfirmed();
            errorMessage = 'Wrong passwrod or sth... idk';
            break;
        }
    }

    if (!valid) {
        if (errorMessage !== undefined) input.setCustomValidity(errorMessage)
        displayError(input);
    } 
    if (valid) {
        input.setCustomValidity('');
        hideError(input);
    }
}

function submitForm () {
    if (form.checkValidity()) console.log('Submitted!');
}

const updateUsernameLength = function updateUsernameLength (input) {
    const length = input.value.length;
    usernameLength.textContent = (length) === 0 ? '' : `${length}/30`;
}

const isPasswordValid = function isPasswordValid () {
    if (password.value.length < 8) return false;
    if (password.value.search(/[A-Z]/) < 0) return false;
    if (password.value.search(/[0-9]/) < 0) return false;
    return true;
}

const isPasswordConfirmed = function () {
    return password.value === confirmPassword.value;
} 

const displayError = function displayErrorMessage (inputElement) {
    const span = inputElement.nextElementSibling;
    span.classList.add('visible');
}

const hideError = function hideErrorMessage (inputElement) {
    const span = inputElement.nextElementSibling;
    if (span.tagName !== 'SPAN') return;
    span.classList.remove('visible');
}