import StandardPageElement from "./standardPageElement.js";

export default class StandardPageTextElement extends StandardPageElement {
    
    constructor(pageElementContent) {
        super(pageElementContent);
    }

    getElement() {
        
        if (this.pageElementContent.metadata.title == "Untitled Text") {
            const elementHeader = document.createElement("h6");
            elementHeader.style.color = "red";
            elementHeader.textContent =  this.pageElementContent.metadata.title;
            element.appendChild(elementHeader);
        }
        
        const pageText = document.createElement("p");
        pageText.innerHTML = this.pageElementContent.params.text;
        const element = document.createElement("div");
        element.appendChild(pageText);
        return element;
    }
}