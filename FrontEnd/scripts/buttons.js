import { generateWorks } from "./works.js";

/*********************************************************************************
 * 
 * This file contains all functions nenessary to render and treat events 
 * for filter buttons. 
 * 
 *********************************************************************************/

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
    // get button's category
    let category = button.textContent;

    button.addEventListener("click", async () => {
        // get all works
        const response = await fetch("http://localhost:5678/api/works");
        const works = await response.json();
        
        let filteredWorks = [...works];
        if (category != "All") {
            filteredWorks = works.filter((work) => {
                return work.category.name === category;
            })
        }
        document.querySelector(".gallery").innerHTML = "";
        generateWorks(filteredWorks);

    })

}

export { renderButtons };


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