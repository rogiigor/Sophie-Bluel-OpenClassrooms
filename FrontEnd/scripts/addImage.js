const realFileInput = document.getElementById("real-file");
const customInput = document.querySelector(".add-photo-input");
const confirmButton = document.querySelector(".btn-confirm");
const formAddPhoto = document.querySelector("form.photo-details");
const figure = document.querySelector(".choose-photo");
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
                const response = await fetch("http://localhost:5678/api/works", {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Authorization': `Bearer ${userToken}`
                    }
                });

                if (response.ok) {
                    console.log("Upload successful!");
                    
                    const result = await response.json();
                    console.log(result.imageUrl);
                    console.log(result);

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

                    updateGalleryWithNewPhoto(result)

                    updateDeleteGallery(result);
                }
            } catch (error) {
                console.error("Upload failed: ", error);
            }
           
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

function updateGalleryWithNewPhoto(result) {
    // update works gallery
    const divGallery = document.querySelector(".gallery");
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
}

function updateDeleteGallery(result) {
    const deleteGallery = document.querySelector(".delete-gallery");

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

export { handleChooseAndSubmitPhoto };
