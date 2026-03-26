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
    } else {
        divHeader.classList.remove("hidden");
        spanEditButton.classList.remove("hidden");
        filters.classList.add("hidden");
        headerElement.before(divHeader);
        projectsTitleElement.append(spanEditButton);
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
    const spanElement = document.createElement("span");
    spanElement.classList.add("edit-span");
    const iconElement = document.createElement("i");
    iconElement.classList.add("far", "fa-edit", "icon-edit");
    const button = document.createElement("button");
    button.classList.add("btn-edit");
    button.innerText = "Edit";
    button.classList.add("edit-button");

    spanElement.appendChild(iconElement);
    spanElement.appendChild(button);

    return spanElement;
}

export { setEditingMode };
