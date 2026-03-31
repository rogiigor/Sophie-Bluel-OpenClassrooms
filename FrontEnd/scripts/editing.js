import { displayDeleteGallery, deleteDeleteGallery,
         handleButtonAddPhoto
 } from "./modal.js";

function setEditingMode() {
    const headerElement = document.querySelector("header");
    const projectsTitleElement = document.querySelector("#portfolio h2");
    const filters = document.querySelector(".filters");

    const divHeader = createEditHeader();
    const editButton = createEditButton();

    const authToken = window.localStorage.getItem("token");

    if (authToken === null) {
        divHeader.classList.add("hidden");
        editButton.classList.add("hidden");
        handleLoginLink();
    } else {
        divHeader.classList.remove("hidden");
        editButton.classList.remove("hidden");
        filters.classList.add("hidden");
        headerElement.before(divHeader);
        projectsTitleElement.append(editButton);

        const worksTitle = document.querySelector(".works-title");
        worksTitle.classList.add("extra-margin-bottom");

        handleLogoutLink();
        handleEditButton();
    }
}

function createEditHeader() {
    /* 
    <div class="edit-header">
        <i class="far fa-edit"></i>
        <p>Editing Mode</p>
    </div>
    */
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
    /*
    <div class="edit-div">
        <i class="far fa-edit icon-edit"></i>
        <btn-edit class="btn-edit">Edit</btn-edit>
    </div>
    */
    const divElement = document.createElement("div");
    divElement.classList.add("edit-div");
    const iconElement = document.createElement("i");
    iconElement.classList.add("far", "fa-edit", "icon-edit");
    const button = document.createElement("button");

    button.classList.add("btn-edit");
    button.innerText = "Edit";

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
    const editButton = document.querySelector(".btn-edit");
    editButton.addEventListener("click", (event) => {
        openModalGallery(event);
    });
    addCloseModalGallery();
    handleButtonAddPhoto();
}

const modal = document.getElementById("modal");
const closeBtn = document.querySelector(".modal-close");

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
    displayDeleteGallery();
}


function addCloseModalGallery() {
    closeBtn.addEventListener("click",() => {
        closeModal();
        deleteDeleteGallery();
    });

    modal.addEventListener("click", function (event) {
        if (event.target === modal) {
            closeModal();
            deleteDeleteGallery();
        }
    });
    
}

export { setEditingMode };
