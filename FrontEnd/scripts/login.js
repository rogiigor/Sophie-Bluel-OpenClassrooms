// login form treatment
const loginForm = document.querySelector(".login-form");

loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const requestBody = {
        email: email,
        password: password
    };
    const payload = JSON.stringify(requestBody);

    const response = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: payload
    });

    if (!response.ok) {
        console.error(`HTTP error! status: ${response.status}`);
        const errorMessage ="Either email or password is incorrect";

        loginForm.reset();

        const errorParagraph = document.createElement("h3");
        errorParagraph.textContent = errorMessage;
        errorParagraph.classList.add("error-msg");

        loginForm.appendChild(errorParagraph);
    } else {
        const login = await response.json();
        const authToken = login.token;
        window.localStorage.setItem("token", authToken);
        
        window.location = "index.html";
    }
})