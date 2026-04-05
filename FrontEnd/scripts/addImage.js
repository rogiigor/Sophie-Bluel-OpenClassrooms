const realFileInput = document.getElementById("real-file");
const customInput = document.querySelector(".add-photo-input");
const confirmButton = document.querySelector(".btn-confirm");
const formAddPhoto = document.querySelector("form.photo-details");
const figure = document.querySelector(".choose-photo");
const btnSubmitContainer = document.querySelector("#add-gallery-photo .btn-container");

function handleChooseAndSubmitPhoto() {
    let title;
    let category;
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
            category = target.value;
        }

        if(file && title && category) {
            // enable confirm button
            confirmButton.disabled = false;
        } 

    });

    btnSubmitContainer.addEventListener("click", (event) => {
        if (event.target.firstElementChild.disabled === true) {
            console.log("Photo, Title and Category need to be completed");
        }
    })

    submitChoosePhotoForm(formAddPhoto, file, title, category);
}


function submitChoosePhotoForm(formAddPhoto, file, title, category) {
    formAddPhoto.addEventListener('submit', (event) => {
        event.preventDefault();

        // send img to backend
        if (file) {
            console.log("file: ", file);
            const formData = new FormData();
            formData.append('image', file, file.name);
            formData.append('title', title);
            formData.append('category', category);
        }
        
    });
}

function choosePhoto(file, target, figure) {
    file = target.files[0];
    if (file) {
        // Generate a temporary Blob URL
        const objectURL = URL.createObjectURL(file);

        // Load the result into img element
        const imagePreview = document.createElement("img");
        imagePreview.src = objectURL;
        imagePreview.classList.add("preview-img");

        figure.innerHTML = "";
        figure.append(imagePreview);

        // Release memory once the image has loaded
        imagePreview.onload = () => {
            URL.revokeObjectURL(objectURL);
        };
    }
    return file;
}

export { handleChooseAndSubmitPhoto };
