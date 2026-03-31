import { getLocalImageFromImageUrl } from "./works.js";

async function displayDeleteGallery() {
    // Retrieve gallery works via HTTP request and convert it to JSON
    const response = await fetch("http://localhost:5678/api/works");
    const works = await response.json();
    generateDeleteGalley(works);
}

function deleteDeleteGallery() {
    const modalGalleryTitle = document.querySelector("#modal h2");
    const deleteGallery = modalGalleryTitle.nextElementSibling;

    if (deleteGallery) {
        deleteGallery.remove();
    }
}

async function generateDeleteGalley(works) {
    const modalGalleryTitle = document.querySelector("#modal h2");

    const deleteGallery = document.createElement("div");
    deleteGallery.classList.add("delete-gallery");

    for (let i = 0; i < works.length; i++ ) {
        const thumbnail = works[i];

        /*
        <div class="thumbnail-container">
            <img src="url_of_image" alt="Project">
            <button class="delete-btn" id="del-<id>">
                <i class="fa-solid fa-trash-can"></i>
            </button>
        </div>
        */
        const container = document.createElement("div");
        container.classList.add("thumbnail-container");

        const imgElement = document.createElement("img");
        let localImage = getLocalImageFromImageUrl(thumbnail.imageUrl);
        
        imgElement.src = localImage;
        imgElement.alt = "Project";
        imgElement.classList.add("thumbnail-img");
        
        const buttonElement = document.createElement("button");
        buttonElement.classList.add("delete-btn");
        buttonElement.id = "del-" + thumbnail.id;
        handleDeleteImageEvent(buttonElement, thumbnail);
        
        const trashIcon = document.createElement("i");
        trashIcon.classList.add("fa-solid", "fa-trash-can");
        buttonElement.appendChild(trashIcon);

        container.appendChild(imgElement);
        container.appendChild(buttonElement);
    
        deleteGallery.appendChild(container);
    }

    modalGalleryTitle.after(deleteGallery);

}

async function handleDeleteImageEvent(buttonElement, thumbnail) {
    const userToken = window.localStorage.getItem("token");
    buttonElement.addEventListener("click", () => {
            console.log("image with id " + thumbnail.id + " was clicked");
            fetch("http://localhost:5678/api/works/" + thumbnail.id, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${userToken}`
                }
            }
        ).then(response => {
            if (response.status === 204) {
                console.log("image was successfully deleted");
                deleteDeleteGallery();
                displayDeleteGallery();
            } else if (response.status === 401) {
                console.log("Authentication failed: Invalid token");
            } else {
                console.error("Deletion failed with status: ", response.status);
            }
        })
        .catch(error => {
            console.log("Error during DELTE request: ", error);
        });
    });

}

function handleButtonAddPhoto() {
    const btnAddPhoto = document.querySelector(".btn-add-photo");
    btnAddPhoto.addEventListener("click", () => {
        // close delete gallery modal
        const deleteGalleryModal = document.querySelector(".modal-gallery");
        console.log(deleteGalleryModal);
        deleteGalleryModal.classList.add("hidden");
        // open add photo modal
        const addPhotoModal = document.querySelector(".modal-add-photo");
        addPhotoModal.classList.remove("hidden");
    });
}

export { displayDeleteGallery, deleteDeleteGallery, handleButtonAddPhoto };