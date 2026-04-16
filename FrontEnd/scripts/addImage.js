import { API_URL } from './config.js';

/*********************************************************************************
 * 
 * This file contains all functions necessary add image to Sophie Bluel works page. 
 * 
 *********************************************************************************/

const realFileInput = document.getElementById("real-file");
const customInput = document.querySelector(".add-photo-input");
const confirmButton = document.querySelector(".btn-confirm");
const formAddPhoto = document.querySelector("form.photo-details");
const figure = document.querySelector(".choose-photo");
const titleInput = document.getElementById("title");
const MAX_FILE_SIZE = 4 * 1024 * 1024;

async function handleChooseAndSubmitPhoto() {
    let title;
    let category;
    let categoryId;
    let file;

    customInput.addEventListener("click", () => {
        realFileInput.click();
    });

    formAddPhoto.addEventListener('change', (e) => {
        const target = e.target;

        if (target.id === "real-file") {
            file = choosePhoto(file, target, figure);
        } else if (target.tagName === 'INPUT' && target.id === "title") {
            title = target.value;
        } else if (target.tagName === 'SELECT') {
            category = target.value.trim();

            const categoryOption = target.options[target.selectedIndex];
            categoryId = Number(categoryOption.id.substring(4));
        }

        if(file && title && category) {
            // enable confirm button
            confirmButton.disabled = false;
        } 
    });

    titleInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
        }
    });
    
    formAddPhoto.addEventListener('submit', async (event) => {
        event.preventDefault();

        // send img to backend
        if (file && title && category) {
            const formData = new FormData();
            formData.append('image', file, file.name);
            formData.append('title', title);
            formData.append('category', categoryId);

            const userToken = window.localStorage.getItem("token");
            try {
                const response = await fetch(`${API_URL}/works`, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Authorization': `Bearer ${userToken}`
                    }
                });

                if (response.ok) {                    
                    const result = await response.json();

                    // remove preview image
                    const previewImg = document.querySelector(".preview-img");
                    previewImg.remove();

                    // show back figure's children
                   for (let child of figure.children) {
                        child.classList.remove("hidden");
                   }

                    // put back form input and select fields
                    formAddPhoto.reset();

                    // make confirm button disabled
                    confirmButton.disabled = true;

                    // remove error message
                    removeErrorMessage();

                    updateGalleriesWithNewImage(result);
                }
            } catch (error) {
                const errorMessage ="Failed to add image";
                displayErrorMsg(figure, errorMessage);
            }
           
        } else if (file && !title && !category) {
            removeErrorMessage();
            const errorMessage ="Title and category cannot be empty";
            displayErrorMsg(figure, errorMessage);
        } else if (file && !title) {
            removeErrorMessage();
            const errorMessage ="Title input cannot be empty. Please fill it up";
            displayErrorMsg(figure, errorMessage);
        } else if (file && !category) {
            removeErrorMessage();
            const errorMessage ="Category cannot be blank. Please choose category";
            displayErrorMsg(figure, errorMessage);
        } 
        
    });
}


function choosePhoto(file, target, figure) {
    file = target.files[0];
    if (file) {
        removeErrorMessage();
        if (!verifyFile(file)) {
            return;
        }

        // Generate a temporary Blob URL
        const objectURL = URL.createObjectURL(file);

        // Load the result into img element
        const imagePreview = document.createElement("img");
        imagePreview.src = objectURL;
        imagePreview.classList.add("preview-img");

        // hide elements inside figure
        for (let child of figure.children) {
            child.classList.add("hidden");
        }

        figure.append(imagePreview);

        // Release memory once the image has loaded
        imagePreview.onload = () => {
            URL.revokeObjectURL(objectURL);
        };
    }
    return file;
}

function removeErrorMessage() {
    const errorMessage = document.querySelector(".error-msg");
    if (errorMessage) {
        errorMessage.remove();
    }
}

function displayErrorMsg(figure, errorMessage) {
    const errorParagraph = document.createElement("h3");
    errorParagraph.textContent = errorMessage;
    errorParagraph.classList.add("error-msg");

    figure.parentElement.appendChild(errorParagraph);
}

function verifyFile(file) {
    const extension = file.name.split('.').pop().toLowerCase();
    if (file.size > MAX_FILE_SIZE) {
        const errorMessage ="File size is too big. Please choose file < 4MB";
        displayErrorMsg(figure, errorMessage);
        return false;
    } else if (extension !== 'jpg' && extension !== 'png') {
        const errorMessage =`File has ${extension} extension. Please choose png or jpg`;
        displayErrorMsg(figure, errorMessage);
        return false;
    }
    return true;
}

function updateGalleriesWithNewImage(result) {
    // update works gallery
    const divGallery = document.querySelector(".gallery");

    // <figure id=${result.id}>
    //     <img src=${result.imageUrl} alt=${result.title}>
    //     <figcaption>${result.title}</figcaption>
    // </figure>

    // Creation of a tag dedicated to a piece of gallery
    const figureElement = document.createElement("figure");
    figureElement.id = "gal-" + result.id; 
    // Creation of tags
    const imageElement = document.createElement("img");
    imageElement.src = result.imageUrl;
    imageElement.alt = result.title;
    const figcaptionElement = document.createElement("figcaption");
    figcaptionElement.innerText = result.title;

    // attach tags to Gallery div
    divGallery.appendChild(figureElement);
    figureElement.appendChild(imageElement);
    figureElement.appendChild(figcaptionElement);

    // update delete gallery
    const deleteGallery = document.querySelector(".delete-gallery");

    // <div class="thumbnail-container">
    //     <img src=${result.imageUrl} alt="Projects" class="thumbnail-img">
    //     <button class="delete-btn" id="del-${result.id}">
    //         <i class="fa-solid fa-trash-can"></i>
    //     </button>
    // </div>

    const container = document.createElement("div");
    container.classList.add("thumbnail-container");

    const imgElement = document.createElement("img");
    imgElement.src = result.imageUrl;
    imgElement.alt = "Project";
    imgElement.classList.add("thumbnail-img");
        
    const buttonElement = document.createElement("button");
    buttonElement.classList.add("delete-btn");
    buttonElement.id = "del-" + result.id;
        
    const trashIcon = document.createElement("i");
    trashIcon.classList.add("fa-solid", "fa-trash-can");
    buttonElement.appendChild(trashIcon);

    container.appendChild(imgElement);
    container.appendChild(buttonElement);
    
    deleteGallery.appendChild(container);
  
}

export { handleChooseAndSubmitPhoto, removeErrorMessage };
