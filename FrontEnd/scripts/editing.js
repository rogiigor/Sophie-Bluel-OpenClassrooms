import { renderDefaultAllWorks } from "./works.js";



function setEditingMode() {
    const headerElement = document.querySelector("header");
    const projectsTitleElement = document.querySelector("#portfolio h2");
    const filters = document.querySelector(".filters");

    const divHeader = createEditHeader();
    const spanEditButton = createEditButton();

    const authToken = window.localStorage.getItem("token");

    if (authToken === null) {
        divHeader.classList.add("hidden");
        spanEditButton.classList.add("hidden");
        handleLoginLink();
    } else {
        divHeader.classList.remove("hidden");
        spanEditButton.classList.remove("hidden");
        filters.classList.add("hidden");
        headerElement.before(divHeader);
        projectsTitleElement.append(spanEditButton);

        const worksTitle = document.querySelector(".works-title");
        worksTitle.classList.add("extra-margin-bottom");

        handleLogoutLink();
        handleEditButton();
    }
}

function createEditHeader() {
    const divElement = document.createElement("div");
    divElement.classList.add("edit-header");
    const iconElement = document.createElement("i");
    iconElement.classList.add("far", "fa-edit");
    const paragraphElement = document.createElement("p");
    paragraphElement.textContent = "Editing Mode";

    divElement.appendChild(iconElement);
    divElement.appendChild(paragraphElement);
    return divElement;
}

function createEditButton() {
    const divElement = document.createElement("div");
    divElement.classList.add("edit-div");
    const iconElement = document.createElement("i");
    iconElement.classList.add("far", "fa-edit", "icon-edit");
    const button = document.createElement("btn-edit");
    button.classList.add("btn-edit");
    button.innerText = "Edit";
    button.classList.add("edit-button");

    divElement.appendChild(iconElement);
    divElement.appendChild(button);

    return divElement;
}

function handleLoginLink() {
    const headerList = document.querySelector(".header-list");
    headerList.addEventListener("click", (event) => {
        if (event.target.textContent == "login") {
            window.location = "login.html";
        }  
    });
}

function handleLogoutLink() {
    const headerList = document.querySelector(".header-list");
    const logoutElement = document.createElement("li");
    logoutElement.innerText = "logout";
    logoutElement.classList.add("logout");
    for (let i = 0; i < headerList.children.length; i++) {
        let listElement = headerList.children[i];
        if (listElement.innerText === "login") {
            listElement.replaceWith(logoutElement);
        }
    }
    logoutElement.addEventListener("click", (event) => {
        const authToken = window.localStorage.getItem("token");
        if (authToken !== null) {
            window.localStorage.removeItem("token");
            window.location = "index.html";
        }
    })
}

function handleEditButton() {
    const editButton = document.querySelector("btn-edit");
    editButton.addEventListener("click", (event) => {

        openModalGallery(event);
        
    });
    addCloseModalGallery();
}

const modal = document.getElementById("modal");
const closeBtn = document.getElementById("btn-close");

function openModal() {
    modal.classList.add("show");
}

function closeModal() {
    modal.classList.remove("show");
}

function openModalGallery(event) {
    const modal = document.getElementById("modal");
    openModal(modal);
    const addPhoto = document.querySelector(".modal-add-photo");
    addPhoto.classList.add("hidden");
}


function addCloseModalGallery() {
    closeBtn.addEventListener("click",() => {
        closeModal();
    });

    modal.addEventListener("click", function (event) {
        if (event.target === modal) {
            closeModal();
        }
    })
}

export { setEditingMode };
