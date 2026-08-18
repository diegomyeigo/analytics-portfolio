form.addEventListener("submit", async function(event) {
    event.preventDefault();

    subButton.disabled = true;
    subButton.textContent = "Submitting.. "

    const formData = new FormData(form);
    // console.log(formData)
    const dataObject = Object.fromEntries(formData);
    // console.log(dataObject)

    try {
        const response = await fetch(`${API_URL}/api/survey`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dataObject)
        });

        const formattedResponse = await response.json();

        if (!response.ok) {
            switch (response.status) {
                case 400:
                    if (formattedResponse.message === "Invalid or missing JSON data") {
                        window.location.href = "../survey/error400.html";
                        return;
                    } else if (formattedResponse.message === "Invalid email") {
                        window.location.href = "../survey/errorInvalidEmail.html"
                        return;
                    }
                    break;

                case 403:
                    window.location.href = "../survey/error403.html";
                    return;

                case 409:
                    window.location.href = "../survey/error409.html";
                    return;

                case 422:
                    window.location.href = "../survey/error422.html";
                    return;

                case 500:
                    if (formattedResponse.message.includes("Email error")) {
                        window.location.href = "../survey/error500.html";
                        return;
                    } else if (formattedResponse.message === "Database error") {
                        window.location.Response = "../survey/errorDatabaseError";
                        return;
                    }
                    break;
                    
                default:
                    throw new Error(`HTTP ${response.status}`)
            }    
        };
        
        window.location.href = "../survey/completion.html"

    } catch (err) {
        console.log("Error:", err);
    
    } finally {
        subButton.disabled = false;
        subButton.textContent = "Submit";
    }
});
