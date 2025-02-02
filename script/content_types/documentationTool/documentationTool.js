import ContentType from "../contentType.js";
import StandardPage from "./pageTypes/standardPage.js";
import GoalsPage from "./pageTypes/goalsPage.js";
import GoalsAssessmentPage from "./pageTypes/goalsAssessmentPage.js";
import ExportPage from "./pageTypes/exportPage.js";

export default class DocumentationTool extends ContentType {
    constructor() {
        super();
        this.name = "DocumentationTool";
    }
    
    parse(contentJson) {
        const content = JSON.parse(contentJson);
        const pagesList = content.pagesList;
        const details = this.createDetailsElement();
        const description = document.createElement("div");
        const contentTypeDescription = document.createElement("p");
        contentTypeDescription.textContent = "This H5P Documentation Tool activity allows the user to provide documentation for a project according to the given task description:";
        contentTypeDescription.style.textAlign = "left";
        const taskDescription = document.createElement("p");
        taskDescription.innerHTML = content.taskDescription;
        taskDescription.style.textAlign = "left";
        description.appendChild(contentTypeDescription);
        description.appendChild(taskDescription);
        const pages = document.createElement("p");
        pages.textContent = `Numer of Pages: ${pagesList.length}`;
        pages.style.textAlign = "left";
        description.appendChild(pages);
        const pageContent = document.createElement("div");
        pageContent.style.textAlign = "left";
        pageContent.innerHTML = "<h4>Documentation Pages:</h4>";
        let pageCounter = 1;
        for (const page of pagesList) {
            const pageTypes = {
                "StandardPage": StandardPage,
                "GoalsPage": GoalsPage,
                "GoalsAssessmentPage": GoalsAssessmentPage,
                "DocumentExportPage": ExportPage
            };
            const type = page.library.substring(page.library.indexOf(".")+ 1, page.library.indexOf(" "));
            const newPage = new pageTypes[type](pageCounter, page);
            pageContent.appendChild(newPage.getPageElement());
        }

        const accordionHtml = this.addLineBreaksToHtml(details.outerHTML);
        return { accordionHtml, solution: '<p style="text-align: left;">Documentation Tool is not a question/answer H5P content type</p>' };
    }
}
