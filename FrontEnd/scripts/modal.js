import { getLocalImageFromImageUrl } from "./works.js";
import { closeModal } from "./editing.js";

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
        deleteGalleryModal.classList.add("hidden");
        // open add photo modal
        const addPhotoModal = document.querySelector(".modal-add-photo");
        addPhotoModal.classList.remove("hidden");
        // get categories list to fill select element
        addCategoriesToSelectElement();
        // disable confirm button
        const confirmButton = document.querySelector(".btn-confirm");
        confirmButton.disabled = true;
    });
}

async function addCategoriesToSelectElement() {
    // Retrieve category of works via HTTP request and convert it to JSON
    const categoriesResponse = await fetch("http://localhost:5678/api/categories");
    const categories = await categoriesResponse.json();

    const selectCategory = document.getElementById("category-select");
    // create default option
    const selectOption = document.createElement("option");
    selectOption.value = "";
    selectCategory.appendChild(selectOption);

    for (let i = 0; i < categories.length; i++) {
        let category = categories[i].name;
        
        const selectOption = document.createElement("option");
        selectOption.value = category;
        selectOption.innerText = category;
        selectCategory.appendChild(selectOption);
    }
}

const modal = document.getElementById("modal");
const closeBtn = document.querySelector(".modal-add-photo .modal-close");
function handleCloseAddPhoto() {
    closeBtn.addEventListener("click",() => {
            closeModal();
            deleteDeleteGallery();
            deleteCategoryOptions();
        });
    
        modal.addEventListener("click", function (event) {
            if (event.target === modal) {
                closeModal();
                deleteDeleteGallery();
                deleteCategoryOptions();
            }
        });
}

function deleteCategoryOptions() {
    const selectCategory = document.getElementById("category-select");
    selectCategory.innerHTML = "";
}

function handleGoBackAddPhoto() {
    const goBackButton = document.querySelector(".back-to-gallery");
    goBackButton.addEventListener("click", () => {
        // open delete gallery modal
        const deleteGalleryModal = document.querySelector(".modal-gallery");
        deleteGalleryModal.classList.remove("hidden");
        // close add photo modal
        const addPhotoModal = document.querySelector(".modal-add-photo");
        addPhotoModal.classList.add("hidden");
    })
}

export { displayDeleteGallery, deleteDeleteGallery, 
    handleButtonAddPhoto, handleCloseAddPhoto, handleGoBackAddPhoto };