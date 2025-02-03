import StandardPageElement from "./standardPageElement.js";

export default class StandardPageTextInputElement extends StandardPageElement {
    //TODO: Implement this class
    constructor(pageElementContent) {
        super(pageElementContent);
    }

    getElement() {
        const elementHeader = document.createElement("h6");
        elementHeader.textContent = this.pageElementContent.metadata.title || "Text Input Field";
        const taskDescription = document.createElement("p");
        taskDescription.innerHTML = this.pageElementContent.params.taskDescription;
        const element = document.createElement("div");
        element.appendChild(elementHeader);
        element.appendChild(taskDescription);
        return element;
    }
}