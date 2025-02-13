import StandardPageElement from "./standardPageElement.js";

export default class StandardPageTextElement extends StandardPageElement {
    
    constructor(pageElementContent) {
        super(pageElementContent);
    }

    getElement() {
        const element = document.createElement("div");
        if (this.pageElementContent.metadata.title != "Untitled Text") {
            const elementHeader = document.createElement("h6");
            elementHeader.textContent =  this.pageElementContent.metadata.title;
            element.appendChild(elementHeader);
        }
        
        const pageText = document.createElement("p");
        pageText.innerHTML = this.pageElementContent.params.text;
        element.appendChild(pageText);
        return element;
    }
}