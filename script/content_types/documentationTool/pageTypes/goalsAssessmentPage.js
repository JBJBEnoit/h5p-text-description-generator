import DocumentationToolPage from "./documentationToolPage.js";

export default class GoalsAssessmentPage extends DocumentationToolPage {

    constructor(pageNumber, pageContent) {
        super(pageNumber, pageContent);
    }

    getPageElement() {
        const pageElement = document.createElement("div");
        pageElement.style.textAlign = "left";
        pageElement.innerHTML = `<h5>Page ${this.pageNumber}: Goals Assessment Page</h5>`;
        const contentElement = document.createElement("div");
        const description = document.createElement("p");
        description.textContent = "This page allows the user to assess progress towards achieving project goals.";
        description.style.textAlign = "left";
        contentElement.appendChild(description);
        pageElement.appendChild(contentElement);
        return pageElement;
    }
}