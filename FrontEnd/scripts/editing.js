import { displayDeleteGallery, deleteDeleteGallery,
         handleButtonAddPhoto, handleCloseAddPhoto,
         handleGoBackAddPhoto
 } from "./modal.js";
 import { handleChooseAndSubmitPhoto } from "./addImage.js";

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

        /** when user comes in and already logged in, change login to logout.
         * This will only happened if we have bearer token.
         */
        handleLogoutLink();

        /** 
         * <section id="modal" class="modal-overlay">
		 *  <div class="modal-box">
		 *	    <div class="modal-gallery">
         *          <button class="modal-close">x</button>
		 *		    ...
		 *	    </div>
		 *	    <div class="modal-add-photo">
		 *		    ...
		 *	    </div>
		 *    </div>
	     * </section> 
         *
         * On clicking edit button -> get element by id 'modal' and add class 'show'
         *                        -> get element with class 'modal-add-photo' add class 'hidden'
         *                        -> display thumbnails delete gallery
         */
        handleEditButton();

        /**
         *  on click to button with class 'modal-close' in 'modal-gallery':
         *  1. section with id 'modal' remove class 'show'
         *  2. div with class 'modal-add-photo' remove class 'hidden' : put back to original state
         *  3. div with class 'modal-gallery remove class 'hidden' : put back to its original state
         *  4. delete thumbnail delete gallery (otherwise when reopening it will show double of elements)
         *  */
        addCloseModalGallery();

        /**
         * on click on button with class 'add-photo' (from first modal) 
         *  1. div with class 'modal-gallery' add 'hidden' class, as we might return to it 2nd modal
         *  2. div with class 'modal-add-photo' remove class 'hidden' 
         */
        handleButtonAddPhoto();

        /**
         * on click button with class 'modal-close' in 'add-photo' modal:
         *   do the same as addCloseModalGallery()
         */
        handleCloseAddPhoto();

        /**
         * on click left arrow '<-' on add-photo modal:
         *   display delete gallery
         *   hide add photo modal
         */
        handleGoBackAddPhoto();

        handleChooseAndSubmitPhoto();
    }
}

function createEditHeader() {
    const editHeader =
    `<div class="edit-header">
        <i class="far fa-edit"></i>
        <p>Editing Mode</p>
    </div>`;
    return createElementFromHTML(editHeader);
}

function createEditButton() {
    const editButton =
    `<div class="edit-div">
        <i class="far fa-edit icon-edit"></i>
        <btn-edit class="btn-edit">Edit</btn-edit>
    </div>`;
    return createElementFromHTML(editButton);
}

function createElementFromHTML(htmlString) {
  const template = document.createElement('template');
  template.innerHTML = htmlString.trim();
  return template.content.firstElementChild;
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
}

const modal = document.getElementById("modal");
const closeBtn = document.querySelector(".modal-gallery .modal-close");

function openModal() {
    modal.classList.add("show");
}

function closeModal() {
    modal.classList.remove("show");
    
    // put back classes
    const addPhotoModal = document.querySelector(".modal-add-photo");
    addPhotoModal.classList.remove("hidden");
    const deleteGalleryModal = document.querySelector(".modal-gallery");
    deleteGalleryModal.classList.remove("hidden");
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

export { setEditingMode, addCloseModalGallery, closeModal, createElementFromHTML };
