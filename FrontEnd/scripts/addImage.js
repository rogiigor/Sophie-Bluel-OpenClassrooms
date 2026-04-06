const realFileInput = document.getElementById("real-file");
const customInput = document.querySelector(".add-photo-input");
const confirmButton = document.querySelector(".btn-confirm");
const formAddPhoto = document.querySelector("form.photo-details");
const figure = document.querySelector(".choose-photo");

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
