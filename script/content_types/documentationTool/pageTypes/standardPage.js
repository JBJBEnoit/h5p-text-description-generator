import DocumentationToolPage from "./documentationToolPage.js";
import StandardPageAccordionElement from "./standardPageElementTypes/standardPageAccordionElement.js";
import StandardPageImageElement from "./standardPageElementTypes/standardPageImageElement.js";
import StandardPageTextElement from "./standardPageElementTypes/standardPageTextElement.js";
import StandardPageTextInputElement from "./standardPageElementTypes/standardPageTextInputElement.js";


export default class StandardPage extends DocumentationToolPage {
    //TODO: Implement this class
    constructor(pageNumber, pageContent) {
        super(pageNumber, pageContent);
    }

    getPageElement() {

        const pageElement = document.createElement("div");
        const pageHeader = document.createElement("h5");
        pageHeader.textContent = `Page ${this.pageNumber}: ${this.pageContent.metadata.title}`;

        const elementTypes = {
            "Accordion": StandardPageAccordionElement,
            "Image": StandardPageImageElement,
            "Text": StandardPageTextElement,
            "TextInputField": StandardPageTextInputElement
        };
        
        for (const el of this.pageContent.params.elementList) {

            const elementType = el.library.substring(el.library.indexOf(".") + 1, el.library.indexOf(" "));
            const element = new elementTypes[elementType](el);
            pageElement.appendChild(element.getElement());
            
        }
        return pageElement;
    }
}