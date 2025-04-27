'use strict';

const form = document.querySelector('.form');

const validationData = {
    name: {
        regExp: /^[A-Za-zА-Яа-яІіЇїЄє\s]{2,}$/,
        errorText: 'Name cannot be empty'
    },
    message: {
        regExp: /^.{5,500}$/,
        errorText: 'Message should have at least 5 symbols'
    },
    phone: {
        regExp: /^\+380\d{9}$/,
        errorText: 'Number should be in format +380[9 digits]'
    },
    email: {
        regExp: /^[a-z0-9_]+@[a-z0-9_]+\.[a-z]{2,4}$/i,
        errorText: 'Invalid email'
    },
}

form.addEventListener('submit', event => {
    event.preventDefault(); 

    const inputs = form.querySelectorAll('.form-input');
    let isAllValid = true;
    const formData = {};

    inputs.forEach(input => {
        const isFieldValid = validateField(input);

        if (!isFieldValid) {
            isAllValid = false;
        }

        formData[input.name] = input.value.trim();
    });

    if (isAllValid) {
        console.log('Form-Data:', formData);
        alert('Form submitted');

        inputs.forEach(input => {
            input.value = '';
        });
    }
});

function validateField(input) {
    const value = input.value.trim();
    const fieldName = input.name;
    if (!validationData[fieldName].regExp.test(value)) {
        showError(input, validationData[fieldName].errorText);
        return false;
    }

    removeError(input);
    return true;
}

function showError(input, message) {
    const prevError = input.nextElementSibling;

    if (prevError.classList.contains('error-message')){
        return;
    }
    
    const currentError = document.createElement('div');
    currentError.classList.add('error-message');
    currentError.textContent = message;

    input.after(currentError);
    input.classList.add('invalid');
}

function removeError(input) {
    const currentError = input.nextElementSibling;
    
    if (currentError.classList.contains('error-message')) {
        currentError.remove();
    }

    input.classList.remove('invalid');
}