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
function generateButtons(categories, works) {
    // Retrieve the DOM element that will host buttons
    const filtersSection = document.querySelector("section.filters");

    // create button for all categories
    const buttonAll = document.createElement("button");
    buttonAll.textContent = "All";
    buttonAll.classList.add("btn-all");
    buttonAll.classList.add("clicked");

    filtersSection.appendChild(buttonAll);
    addEvenetListenerToFilterSection(filtersSection, works);

    for (let i = 0; i < categories.length; i++) {
        let btnCategory = categories[i].name;

        let classBtnCategory = createClassNameFromCatheory(btnCategory);
        
        let filterButton = document.createElement("button");
        filterButton.textContent = btnCategory;
        filterButton.classList.add(classBtnCategory);
        filtersSection.appendChild(filterButton);
        addEvenetListenerToFilterSection(filtersSection, works);
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
    const categoriesResponse = await fetch("http://localhost:5678/api/categories");
    const categories = await categoriesResponse.json();

    // get all works
    const worksResponse = await fetch("http://localhost:5678/api/works");
    const works = await worksResponse.json();
    generateButtons(categories, works);
}

/**
 * This function adds eveentListener to button
 * @param {Node} section: Node element for section that is parent of button
 */
function addEvenetListenerToFilterSection(section, works) {
    section.addEventListener("click", async (event) => {

        if (event.target.nodeName === 'BUTTON') {
                const category = event.target.textContent;

                let filteredWorks = [...works];
                if (category != "All") {
                    filteredWorks = works.filter((work) => {
                        return work.category.name === category;
                    })
                }
                document.querySelector(".gallery").innerHTML = "";
                generateWorks(filteredWorks);

                // set clicked class to clicked button
                setCickedClass(event);
        }
    })

}

/**
 * 
 * @param {object} event: event on the clicked button 
 */
function setCickedClass(event) {
    const btnCount = event.target.parentElement.children.length;
    for (let i = 0; i < btnCount; i++) {
        let button = event.target.parentElement.children[i];
        button.classList.remove("clicked");
    }
    event.target.classList.add("clicked");
}

export { renderButtons };