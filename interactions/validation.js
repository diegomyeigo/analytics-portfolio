const form = document.getElementById("finance_survey");
const subButton = document.getElementById("submit");

(function () {
    function checkFields() {
        subButton.disabled = !form.checkValidity();
    }

    form.addEventListener("input", checkFields);
    form.addEventListener("change", checkFields);

    checkFields();

}());

const email = document.getElementById("email")
const emailFlag = document.getElementById("emailError")

// helper raises flag and disables submit button
function rejectEmail(textContent) {
    emailFlag.classList.replace("pass", "error")
    emailFlag.textContent = `${textContent}`
    subButton.disabled = true
}

// general check for email structure
email.addEventListener("input", () => {
    const emailString = String(email.value)
    const basicPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const [local, domain] = emailString.split("@");

    let errorMessage = ""

    if (!basicPattern.test(emailString)) {
        errorMessage = "Invalid email pattern";
    }
    if (emailString.includes(" ") || emailString.includes("..")) {
        errorMessage = "Email cannot contain whitespace or consecutive '.'";
    } 
    else if (local.startsWith(".") || local.endsWith(".")) {
        errorMessage = "Local name should not start or end with '.'";
    } 
    else if (!domain) {
        errorMessage = "No domain detected";
    } 
    else if (domain.startsWith(".") || domain.endsWith(".")) {
        errorMessage = "Domain name should not start or end with '.'";
    } 

    if (errorMessage) {
        rejectEmail(errorMessage)
    } else {
        emailFlag.classList.replace("error", "pass");
        emailFlag.textContent = "";
    };
});


// validating number format and range
function checkFormat(value) {
    return /^(?:\d+|\d+\.\d{2})$/.test(value);
};

function checkRange(value, min, max) {
    return ((value >= min) && (value <= max));
};

function checkNumberValidity(id, errorDiv) {
    const input = document.getElementById(id);
    const error = document.getElementById(errorDiv);

    input.addEventListener("input", () => {
        const raw = input.value;
        const min = Number(input.min);
        const max = Number(input.max);

        if (!checkFormat(raw)) {
            error.classList.replace("pass", "error");
            error.textContent = "Value must not be negative, contain non-numeric characters, or have more than two digits after the decimal";
            return;
        }
        else {
            const numberInput = Number(raw);
            if (!checkRange(numberInput, min, max)) {
                error.classList.replace("pass", "error");
                error.textContent = `Value must be between ${min} and ${max}`;
                return;
            };
            error.classList.replace("error", "pass");
            error.textContent = "";
            return;
        };
    });
};

// for testing purposes only

// fetch("https://personal-website-backend-98gm.onrender.com/api/test")
//     .then(response => {
//         if (!response.ok) {
//             throw new Error(`HTTP Error ${response.status}`);
//         }
//         return response.json();
//     })
//     .then(data => {
//         console.log("Connection successful!");
//         console.log(data);
//     })
//     .catch(error => {
//         console.error("Error connecting to backend:", error);
//     });

checkNumberValidity("income", "incomeError");
checkNumberValidity("rent", "rentError");
checkNumberValidity("savings", "savingsError");
checkNumberValidity("emergency", "emergencyError");
