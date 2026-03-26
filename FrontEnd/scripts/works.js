/*********************************************************************************
 * 
 * This file contains all functions nenessary to reder Sophie Bluel works page. 
 * 
 *********************************************************************************/

/**
 * This function generates all works of designer
 * @param {array of Nodes} works : works of designer
 */
function generateWorks(works) {
    // Retrieving the DOM element that will host the records
    const divGallery = document.querySelector(".gallery");

    for (let i = 0; i < works.length; i++) {
        const figure = works[i];
   
        // Creation of a tag dedicated to a piece of gallery
        const figureElement = document.createElement("figure");
        // Creation of tags
        const imageElement = document.createElement("img");
        let localImage = getLocalImageFromImageUrl(figure.imageUrl);
        imageElement.src = localImage;
        imageElement.alt = figure.title;
        let figcaptionElement = document.createElement("figcaption");
        figcaptionElement.innerText = figure.title;

        // attach tags to Gallery div
        divGallery.appendChild(figureElement);
        figureElement.appendChild(imageElement);
        figureElement.appendChild(figcaptionElement);
    }
}

/**
 * This function generates local imageUrl given HTTP Api Url
 * @param {string} imageUrl : Url of image from HTTP call
 */
function getLocalImageFromImageUrl(imageUrl) {
    let urlPparts = imageUrl.split("/");
    let imgFromDb = urlPparts[urlPparts.length - 1];
    let imgName = imgFromDb.split(/\d/)[0];
    let imgExtension = imgFromDb.split(".")[1];
    return "assets/images/" + imgName + "." + imgExtension;
}

/**
 * This function rendels all designer's works
 */
async function renderDefaultAllWorks() {
    // Retrieve gallery works via HTTP request and convert it to JSON
    const response = await fetch("http://localhost:5678/api/works");
    const works = await response.json();
    generateWorks(works);
}

function setEditingMode() {
    const headerElement = document.querySelector("header");

    const divElement = document.createElement("div");
    divElement.classList.add("edit-header");
    const iconElement = document.createElement("i");
    iconElement.classList.add("far", "fa-edit");
    const paragraphElement = document.createElement("p");
    paragraphElement.textContent = "Editing Mode";

    divElement.appendChild(iconElement);
    divElement.appendChild(paragraphElement);

    const authToken = window.localStorage.getItem("token");
    console.log("token: ", authToken);
    if (authToken === null) {
        divElement.classList.add("hidden");
    } else {
        divElement.classList.remove("hidden");
        headerElement.before(divElement);
    }
}

export { renderDefaultAllWorks, generateWorks, setEditingMode };