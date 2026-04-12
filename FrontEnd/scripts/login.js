import {API_URL } from './config.js';

/*********************************************************************************
 * 
 * This file contains all functions necessary to login for admin person. 
 * 
 *********************************************************************************/

const loginForm = document.querySelector(".login-form");

function handleLoginForm() {
    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const requestBody = {
            email: email,
            password: password
        };
        const payload = JSON.stringify(requestBody);

        const response = await fetch(`${API_URL}/users/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: payload
        });

        const login = await response.json();

        if (!response.ok) {
            loginForm.reset();

            const errorMessage ="Either email or password is incorrect";            

            const errorParagraph = document.createElement("h3");
            errorParagraph.textContent = errorMessage;
            errorParagraph.classList.add("error-msg");

            loginForm.appendChild(errorParagraph);
        } else {
            // const login = await response.json();
            const authToken = login.token;
            window.localStorage.setItem("token", authToken);
        
            window.location = "index.html";
        }
    });
}

function handleProjectsLink() {
    const headerList = document.querySelector(".header-list");
    headerList.addEventListener("click", (event) => {
        if (event.target.textContent == "projects") {
            window.location = "index.html";
        }  
    });
}

handleProjectsLink();

handleLoginForm();
