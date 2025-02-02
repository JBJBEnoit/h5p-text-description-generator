import { DocumentationToolPage } from "./documentationToolPage.js";

export default class ExportPage extends DocumentationToolPage {
    constructor(pageNumber, pageContent) {
        super(pageNumber, pageContent);
    }

    getPageElement() {
        const pageElement = document.createElement("div");
        pageElement.style.textAlign = "left";
        pageElement.innerHTML = `<h5>Page ${this.pageNumber}: Document Export Page</h5>`;
        const contentElement = document.createElement("div");
        const description = document.createElement("p");
        description.textContent = "This page allows the user to export the created document.";
        description.style.textAlign = "left";
        contentElement.appendChild(description);
        pageElement.appendChild(contentElement);
        return pageElement;
    }
}