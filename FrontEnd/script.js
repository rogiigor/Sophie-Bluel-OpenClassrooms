/*********************************************************************************
 * 
 * This file contains all functions nenessary to reder Sophie Bluel works page. 
 * 
 *********************************************************************************/

/**
 * This function generates all works of designer
 * @param {array of Nodes} works : works of designer
 */
function generateWorks(works) {
    // Retrieving the DOM element that will host the records
    const divGallery = document.querySelector(".gallery");

    for (let i = 0; i < works.length; i++) {
        const figure = works[i];
   
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

/**
 * This function generates local imageUrl given HTTP Api Url
 * @param {string} imageUrl : Url of image from HTTP call
 */
function getLocalImageFromImageUrl(imageUrl) {
    let urlPparts = imageUrl.split("/");
    let imgFromDb = urlPparts[urlPparts.length - 1];
    let imgName = imgFromDb.split(/\d/)[0];
    let imgExtension = imgFromDb.split(".")[1];
    return "assets/images/" + imgName + "." + imgExtension;
}

/**
 * This function rendels all designer's works
 */
async function renderDefaultAllWorks() {
    // Retrieve gallery works via HTTP request and convert it to JSON
    const response = await fetch("http://localhost:5678/api/works");
    const works = await response.json();
    generateWorks(works);
}

/**
 * This function generates all all filters button plus button for all works
 * @param {array of Nodes} categories : categories of works
 */
function generateButtons(categories) {
    // Retrieve the DOM element that will host buttons
    const filtersSection = document.querySelector("section.filters");

    // create button for all categories
    const buttonAll = document.createElement("button");
    buttonAll.textContent = "All";
    buttonAll.classList.add("btn-all");
    buttonAll.classList.add("clicked");

    filtersSection.appendChild(buttonAll);
    addEvenetListenerToButton(buttonAll);

    for (let i = 0; i < categories.length; i++) {
        let btnCategory = categories[i].name;

        let classBtnCategory = createClassNameFromCatheory(btnCategory);
        
        let filterButton = document.createElement("button");
        filterButton.textContent = btnCategory;
        filterButton.classList.add(classBtnCategory);
        filtersSection.appendChild(filterButton);
        addEvenetListenerToButton(filterButton);
    }
}

/**
 * This function makes first letter of word capital 
 * @param {string} word : a word
 */
function capiatlizeFirstLetterWord(word) {
    let newWord = word[0].toUpperCase() + word.substring(1);
    return newWord;
}

/**
 * This function creates class from category name
 * @param {string} categories : catgory
 */
function createClassNameFromCatheory(category) {
    const words = category.split(" ");
    const onlyAlphabeticWords = words.map((word) => {
        if (word === "&") {
            word = "and"
        }
        let lowercaseWord = word.toLowerCase();
        return lowercaseWord;
    })
    return "btn-" + onlyAlphabeticWords.join('-');
}

/**
 * This function renders all buttons
 * @param {} : no input
 */
async function renderButtons() {
    // Retrieve category of works via HTTP request and convert it to JSON
    const response = await fetch("http://localhost:5678/api/categories");
    const categories = await response.json();
    generateButtons(categories);
}

/**
 * This function adds eveentListener to button
 * @param {Node} button: Node element for a button
 */
function addEvenetListenerToButton(button) {
    console.log(button);


}

renderDefaultAllWorks();

renderButtons();


// buttons management
// const buttonAll = document.querySelector(".btn-all");
// const buttonObjects = document.querySelector(".btn-objects");
// const buttonApartments = document.querySelector(".btn-apratments");
// const buttonHotelsNRestaurants = document.querySelector(".btn-hotels-and-restaurants");

// buttonAll.addEventListener("click", async function () {
//     const response = await fetch("http://localhost:5678/api/works");
//     const works = await response.json();
//     document.querySelector(".gallery").innerHTML = "";
//     generateWorks(works);
//     buttonObjects.classList.remove("clicked");
//     buttonApartments.classList.remove("clicked");
//     buttonHotelsNRestaurants.classList.remove("clicked");
//     buttonAll.classList.add("clicked");
// });

// buttonObjects.addEventListener("click", async function () {
//      const response = await fetch("http://localhost:5678/api/works");
//      const works = await response.json();
//      const worksObjects = works.filter(function(work) {
//         return work.category.name === "Objects";
//      });
//      console.log(worksObjects);
//      document.querySelector(".gallery").innerHTML = "";
//      generateWorks(worksObjects);
//      buttonAll.classList.remove("clicked");
//      buttonApartments.classList.remove("clicked");
//      buttonHotelsNRestaurants.classList.remove("clicked");
//      buttonObjects.classList.add("clicked");
// });


// buttonApartments.addEventListener("click", async function () {
//     const response = await fetch("http://localhost:5678/api/works");
//     const works = await response.json();
//     const worksApartments = works.filter(function(work) {
//         return work.category.name === "Apartments";
//     });
//     document.querySelector(".gallery").innerHTML = "";
//     generateWorks(worksApartments);
//     buttonAll.classList.remove("clicked");
//     buttonObjects.classList.remove("clicked");
//     buttonHotelsNRestaurants.classList.remove("clicked");
//     buttonApartments.classList.add("clicked");
// });

// buttonHotelsNRestaurants.addEventListener("click", async function() {
//     const response = await fetch("http://localhost:5678/api/works");
//     const works = await response.json();
//     const worksHotelsNRestaurants = works.filter(function(work) {
//         return work.category.name === "Hotels & restaurants";
//     });
//     document.querySelector(".gallery").innerHTML = "";
//     generateWorks(worksHotelsNRestaurants);
//     buttonAll.classList.remove("clicked");
//     buttonObjects.classList.remove("clicked");
//     buttonApartments.classList.remove("clicked");
//     buttonHotelsNRestaurants.classList.add("clicked");
// });

 



