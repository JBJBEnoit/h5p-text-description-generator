import StandardPageElement from "./standardPageElement";

export default class StandardPageImageElement extends StandardPageElement {
    
    constructor(pageElementContent) {
        super(pageElementContent);
    }

    getElement() {
        const elementHeader = document.createElement("h6");
        elementHeader.textContent = this.pageElementContent.metadata.title;
        const altText = document.createElement("p");
        altText.textContent = `Image: ${this.pageElementContent.params.altText}`;
        const element = document.createElement("div");
        element.appendChild(elementHeader);
        element.appendChild(altText);
        return element;
    }
}