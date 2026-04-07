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
                    console.log("Upload successful!")

                    // remove preview image
                    const previewImg = document.querySelector(".preview-img");
                    previewImg.remove();

                    // show figure's children
                   for (let child of figure.children) {
                        child.classList.remove("hidden");
                   }

                    // put back form
                    formAddPhoto.reset();
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

export { handleChooseAndSubmitPhoto };
