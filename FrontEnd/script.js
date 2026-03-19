function generateWorks(works) {
    for (let i = 0; i < works.length; i++) {
        const figure = works[i];

        // Retrieving the DOM element that will host the records
        const divGallery = document.querySelector(".gallery");
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

function getLocalImageFromImageUrl(imageUrl) {
    let urlPparts = imageUrl.split("/");
    let imgFromDb = urlPparts[urlPparts.length - 1];
    let imgName = imgFromDb.split(/\d/)[0];
    let imgExtension = imgFromDb.split(".")[1];
    return "assets/images/" + imgName + "." + imgExtension;
}

async function displayDefaultAll() {
    // Retrive gallery works via HTTP request and convert it to JSON
    const response = await fetch("http://localhost:5678/api/works");
    const works = await response.json();
    generateWorks(works);
    document.querySelector(".btn-all").classList.add("clicked");
}

displayDefaultAll();

// buttons management
const buttonAll = document.querySelector(".btn-all");
const buttonObjects = document.querySelector(".btn-objects");
const buttonApartments = document.querySelector(".btn-apratments");
const buttonHotelsNRestaurants = document.querySelector(".btn-hotels-and-restaurants");

buttonAll.addEventListener("click", async function () {
    const response = await fetch("http://localhost:5678/api/works");
    const works = await response.json();
    document.querySelector(".gallery").innerHTML = "";
    generateWorks(works);
    buttonObjects.classList.remove("clicked");
    buttonApartments.classList.remove("clicked");
    buttonHotelsNRestaurants.classList.remove("clicked");
    buttonAll.classList.add("clicked");
});

buttonObjects.addEventListener("click", async function () {
     const response = await fetch("http://localhost:5678/api/works");
     const works = await response.json();
     const worksObjects = works.filter(function(work) {
        return work.category.name === "Objects";
     });
     console.log(worksObjects);
     document.querySelector(".gallery").innerHTML = "";
     generateWorks(worksObjects);
     buttonAll.classList.remove("clicked");
     buttonApartments.classList.remove("clicked");
     buttonHotelsNRestaurants.classList.remove("clicked");
     buttonObjects.classList.add("clicked");
});


buttonApartments.addEventListener("click", async function () {
    const response = await fetch("http://localhost:5678/api/works");
    const works = await response.json();
    const worksApartments = works.filter(function(work) {
        return work.category.name === "Apartments";
    });
    document.querySelector(".gallery").innerHTML = "";
    generateWorks(worksApartments);
    buttonAll.classList.remove("clicked");
    buttonObjects.classList.remove("clicked");
    buttonHotelsNRestaurants.classList.remove("clicked");
    buttonApartments.classList.add("clicked");
});

buttonHotelsNRestaurants.addEventListener("click", async function() {
    const response = await fetch("http://localhost:5678/api/works");
    const works = await response.json();
    const worksHotelsNRestaurants = works.filter(function(work) {
        return work.category.name === "Hotels & restaurants";
    });
    document.querySelector(".gallery").innerHTML = "";
    generateWorks(worksHotelsNRestaurants);
    buttonAll.classList.remove("clicked");
    buttonObjects.classList.remove("clicked");
    buttonApartments.classList.remove("clicked");
    buttonHotelsNRestaurants.classList.add("clicked");
});

 



