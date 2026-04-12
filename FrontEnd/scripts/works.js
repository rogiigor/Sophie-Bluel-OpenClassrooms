import { API_URL } from './config.js';

/*********************************************************************************
 * 
 * This file contains all functions necessary to render Sophie Bluel works page. 
 * 
 *********************************************************************************/

/**
 * This function generates all works of designer
 * @param {array of Nodes} works : works of designer
 */
function generateWorks(works) {
    // Retrieving the DOM element that will host the records
    const divGallery = document.querySelector(".gallery");

    const titleSet = new Set();
    for (let i = 0; i < works.length; i++) {
        const figure = works[i];
        if (titleSet.has(figure.title)) {
            continue;
        }
        titleSet.add(figure.title);
   
        /** Creation of a tag dedicated to a piece of gallery
         <figure id="gal-${figure.id}">
             <img src=${figure.imageUrl} alt=${figure.title}>
             <figcaption>${figure.title}</figcaption>
         </figure> 
         */
        const figureElement = document.createElement("figure");
        figureElement.id = "gal-" + figure.id; 
        // Creation of tags
        const imageElement = document.createElement("img");
        imageElement.src = figure.imageUrl;
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
 * This function renders all designer's works
 */
async function renderDefaultAllWorks() {
    // Retrieve gallery works via HTTP request and convert it to JSON
    const response = await fetch(`${API_URL}/works`);
    const works = await response.json();
    generateWorks(works);
}

export { renderDefaultAllWorks, generateWorks };