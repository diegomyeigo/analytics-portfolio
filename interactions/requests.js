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
console.log("Hello from javascript!");

form.addEventListener("submit", async function(event) {
    event.preventDefault();

    subButton.disabled = true;
    subButton.textContent = "Submitting.. "

    const formData = new FormData(form);
    // console.log(formData)
    const dataObject = Object.fromEntries(formData);
    // console.log(dataObject)

    try {
        const response = await fetch("https://personal-website-backend-98gm.onrender.com/api/survey", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dataObject)
        });
        if (!response.ok) {
            switch (response.status) {
                case 400:
                    window.location.href = "../survey/error400";
                    return;

                case 403:
                    window.location.ref = "../survey/error403";
                    return;

                case 422:
                    window.location.href = "../survey/error422";
                    return;

                case 500:
                    window.location.href "../survey/error500";
                    return;
            }

            throw new Error(`Error status: ${response.status}`)
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
