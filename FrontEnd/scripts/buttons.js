import { generateWorks } from "./works.js";

/*********************************************************************************
 * 
 * This file contains all functions necessary to render and treat events 
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
    buttonAll.id = 0;

    filtersSection.appendChild(buttonAll);
    addEventListenerToFilterSection(filtersSection, works);

    for (let i = 0; i < categories.length; i++) {
        let btnCategory = categories[i].name;

        let classBtnCategory = createClassNameFromCategory(btnCategory);
        let btnId = categories[i].id;

        let filterButton = document.createElement("button");
        filterButton.textContent = btnCategory;
        filterButton.classList.add(classBtnCategory);
        filterButton.id = btnId;
        filtersSection.appendChild(filterButton);
        addEventListenerToFilterSection(filtersSection, works);
    }
}

/**
 * This function creates class from category name
 * @param {string} categories : catgory
 */
function createClassNameFromCategory(category) {
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
 * This function adds eventListener to button
 * @param {Node} section: Node element for section that is parent of button
 */
function addEventListenerToFilterSection(section, works) {
    section.addEventListener("click", trackElements(works))
}

/**
 * This function render button based on category which is 
 * event.target of the clicked section where all buttons are
 * @param {Node elements} works : works retrieved by HTTP call
 * @returns 
 */
function trackElements(works) {
    
    let previousTarget = null;
    let currentTarget = null;

    // closure
    return (event) => {
        if (event.target.nodeName === 'BUTTON') {
            const categoryId = parseInt(event.target.id);

            let filteredWorks = [...works];
            if (categoryId !== 0) {
                filteredWorks = works.filter((work) => {
                    return work.category.id === categoryId;
                })
            }

            let uniqueWorksSet = new Set();
            filteredWorks.forEach(work => uniqueWorksSet.add(work));
            const uniqueWorks = [...uniqueWorksSet];

            document.querySelector(".gallery").innerHTML = "";
            generateWorks(uniqueWorks);

            ({ previousTraget: previousTarget, currentTarget } = setClickedClass(previousTarget, currentTarget, event));
        }
        
    };
};


/**
 * This function sets clicked class depending on previous or current target and event
 * @param {*} previousTarget 
 * @param {*} currentTarget 
 * @param {*} event 
 * @returns 
 */
function setClickedClass(previousTarget, currentTarget, event) {
    previousTarget = currentTarget;
    currentTarget = event.target;

    // set clicked class to clicked button
    if (previousTarget !== null) {
        previousTarget.classList.remove("clicked");
    } else {
        // button All is clicked by default
        const allButton = document.querySelector(".btn-all");
        allButton.classList.remove("clicked");
    }
    currentTarget.classList.add("clicked");
    return { previousTarget: previousTarget, currentTarget };
}

export { renderButtons };
