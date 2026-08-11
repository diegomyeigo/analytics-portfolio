// fetch("https://personal-website-backend-98gm.onrender.com/api/test")
//     .then(response => {
//         if (!response.ok) {
//             throw new Error(`HTTP Error: ${response.status}`);
//         }
//         return response.json();
//     })
//     .then(data => {
//         console.log("Successful communication");
//         console.log(data);
//     })
//     .catch(error => {
//         console.log("Failed to connect", error)
//     })

const form = document.getElementById("finance_survey");
const subButton = document.getElementById("submit")

form.addEventListener("submit", async function(event) {
    event.preventDefault();

    subButton.disabled = true;
    subButton.textContent = "Submitting.. "

    const formData = new FormData(form);
    const dataObject = Object.fromEntries(formData);


    try {
        const response = await fetch("https://personal-website-backend-98gm.onrender.com/api/survey", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dataObject)
        });
        if (!response.ok) {
            throw new Error(`HTTP Error ${response.status}`)
        };
        const formattedResponse = await response.json();
        console.log(formattedResponse);
    } catch (err) {
        console.log("Error:", err);
    } finally {
        subButton.disabled = false;
        subButton.textContent = "Submit";
        window.location.href = "../survey/completion.html"
    }
});
