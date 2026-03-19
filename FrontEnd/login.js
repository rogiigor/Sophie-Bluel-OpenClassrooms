// login form treatment
const loginForm = document.querySelector(".login-form");

loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await fetch("http://localhost:5678/api/users/login");
    const login = response.json();
    if (email !== login.email || password !== login.password) {
        console.log("Invalid username or password");
    }
    window.location = "index.html";
})