import StandardPageElement from "./standardPageElement.js";

export default class StandardPageTextElement extends StandardPageElement {
    
    constructor(pageElementContent) {
        super(pageElementContent);
    }

    getElement() {
        const elementHeader = document.createElement("h6");
        elementHeader.textContent = this.pageElementContent.metadata.title;
        const pageText = document.createElement("p");
        pageText.innerHTML = this.pageElementContent.params.text;
        const element = document.createElement("div");
        element.appendChild(elementHeader);
        element.appendChild(pageText);
        return element;
    }
}