"use strict";

// Global vars
const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const signUpBtn = document.getElementById("signUpBtn");

const container = document.querySelector(".container");

const signUpForm = document.getElementById("signUpForm");
const signInForm = document.getElementById("signInForm");
const inputs = document.querySelectorAll(`input`)

let accounts = [];
let isMatch = [];

sign_up_btn.addEventListener("click", function () {
    container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", function () {
    container.classList.remove("sign-up-mode");
});

// end of styling 

if (localStorage.getItem("userData") !== null) {
    accounts = JSON.parse(localStorage.getItem('userData'));
}

// sign up form

signUpForm.addEventListener('submit', function (e) {
    e.preventDefault();
    let isAlreadyRegisterd = false;
    for (let i = 0; i < accounts.length; i++) {
        if (accounts[i].email === inputs[3].value) {
            isAlreadyRegisterd = true;
            swal({
                title: "Try Again!",
                text: "Email is Already Registered",
                icon: "error",
                button: "OK",
            });
            break;
        }
    }
    if (!isAlreadyRegisterd) {
        swal({
            title: "Welcome!",
            text: "Sign-up Successfully",
            icon: "success",
            button: "Login",
        }).then(function () {
            localStorage.setItem("userData", JSON.stringify(accounts));
            container.classList.remove("sign-up-mode");
        });
    }
    userData()
});

function userData() {
    const signUpData = {
        username: inputs[2].value,
        email: inputs[3].value,
        password: inputs[4].value,
    }
    accounts.push(signUpData);
}

/* ===================================== */

// Login form

signInForm.addEventListener("submit", function (e) {
    e.preventDefault();
    loginData();
});


function loginData() {
    const signInData = {
        email: inputs[0].value,
        password: inputs[1].value
    };

    let isMatch = false;

    for (let i = 0; i < accounts.length; i++) {
        if (accounts[i].email === signInData.email && accounts[i].password === signInData.password) {
            localStorage.setItem('userName', accounts[i].username)
            isMatch = true;
            location.href = `./home.html`
            clearInputs();
            break;
        }
    }

    if (!isMatch) {
        document.getElementById("invalidMsg").classList.remove('d-none')
    }
}


// clear form
function clearInputs() {
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = null;
    }
}

// validation 

function validationName(userName) {
    const regex = /^[0-9A-Za-z\s]{3,}$/

    if (regex.test(userName.value)) {
        userName.classList.remove("is-invalid");
        userName.classList.add("is-valid");
        document.getElementById('realTimeName').classList.add(`d-none`);
        return true;
    } else {
        userName.classList.add("is-invalid");
        userName.classList.remove("is-valid");
        document.getElementById('realTimeName').classList.remove(`d-none`);
        return false;
    }
}

function validationEmail(emailInput) {
    const regex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

    if (regex.test(emailInput.value)) {
        emailInput.classList.remove("is-invalid");
        emailInput.classList.add("is-valid");
        document.getElementById('realTimeEmail').classList.add(`d-none`);
        return true;
    } else {
        emailInput.classList.add("is-invalid");
        emailInput.classList.remove("is-valid");
        document.getElementById('realTimeEmail').classList.remove(`d-none`);
        return false;
    }
}

function validationPassword(passwordInput) {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (regex.test(passwordInput.value)) {
        passwordInput.classList.remove("is-invalid");
        passwordInput.classList.add("is-valid");
        document.getElementById('realTimePass').classList.add(`d-none`);
        return true;
    } else {
        passwordInput.classList.add("is-invalid");
        passwordInput.classList.remove("is-valid");
        document.getElementById('realTimePass').classList.remove(`d-none`);
        return false;
    }
}

for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener(`input`, function () {
        const emailInput = document.getElementById('userEmail');
        const passwordInput = document.getElementById('userPass')
        const userName = document.getElementById("userName");
        if (validationName(userName) && validationEmail(emailInput) && validationPassword(passwordInput)) {
            signUpBtn.removeAttribute("disabled");
        } else {
            signUpBtn.setAttribute("disabled", "");
        }
    })
}