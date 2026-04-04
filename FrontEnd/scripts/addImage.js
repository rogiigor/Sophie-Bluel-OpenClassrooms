function handleChooseAndSubmitPhoto() {
    const realFileInput = document.getElementById("real-file");
    const customInput = document.querySelector(".add-photo-input");

    customInput.addEventListener("click", () => {
        realFileInput.click();
    });

    const figure = document.querySelector(".choose-photo");

    realFileInput.addEventListener("change", (event) => {
        const file = event.target.files[0];
        console.log(file);
        if (file) {
            // Generate a temporary Blob URL
            const objectURL = URL.createObjectURL(file);
                
            // Load the result into img element
            const imagePreview = document.createElement("img");
            imagePreview.src = objectURL;

            imagePreview.height = 240;
            imagePreview.width = 184;
            figure.innerHTML = "";
            figure.append(imagePreview);

            // Release memory once the image has loaded
            imagePreview.onload = () => {
                URL.revokeObjectURL(objectURL);
            }
        }
    });
}

export { handleChooseAndSubmitPhoto };
