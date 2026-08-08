(function () {
    const form = document.getElementById("finance_survey");
    const subButton = document.getElementById("submit");

    function checkFields() {
        subButton.disabled = !form.checkValidity();
    }

    form.addEventListener("input", checkFields);
    form.addEventListener("change", checkFields);

    checkFields();

}());

function raiseRangeError(id, flag) {
    const input = document.getElementById(id);
    const error = document.getElementById(flag);

    input.addEventListener("input", () => {
        const value = Number(input.value);
        const min = Number(input.min);
        const max = Number(input.max);

        if ((input.value === "") || (value > min & value < max)) {
            error.classList.replace("error", "pass");
            error.textContent = "";
            return;
        } else if (value < min || value > max) {
            error.textContent = `Value must be between ${min} and ${max}`;
            error.classList.replace("pass", "error");
            return;
        }

})};


fetch("https://personal-website-backend-98gm.onrender.com")
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error("Error connecting to backend:", error);
    });


raiseRangeError("income", "incomeError");
raiseRangeError("rent", "rentError");
raiseRangeError("savings", "savingsError");
raiseRangeError("emergency", "emergencyError");