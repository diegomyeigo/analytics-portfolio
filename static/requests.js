const form = document.getElementById("finance_survey");

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const formData = new FormData(form);
    const dataObject = Object.fromEntries(formData);

    fetch("https://personal-website-backend-98gm.onrender.com/api/survey", {
        method: "POST",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify(dataObject)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`)
        }
        return response.json()
    })
    .then(data => {
        console.log(data)
    })
    .catch(error => {
        console.error("Error in communication", error)
    });
});

// CORS blocking connection