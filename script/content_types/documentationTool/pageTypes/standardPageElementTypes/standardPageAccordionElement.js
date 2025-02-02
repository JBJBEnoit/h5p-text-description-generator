import StandardPageElement from "./standardPageElement.js";

export default class StandardPageAccordionElement extends StandardPageElement {

    constructor(pageElementContent) {
        super(pageElementContent);
    }

    getElement() {
        const elementHeader = document.createElement("h6");
        elementHeader.textContent = this.pageElementContent.metadata.title || "Accordion";
        const element = document.createElement("div");

        for (const panel of this.pageElementContent.params.panels) {
            const panelElement = document.createElement("div");
            const panelHeader = document.createElement("h6");
            panelHeader.textContent = panel.title;
            const panelContent = document.createElement("p");
            panelContent.textContent = panel.content.params.text;
            panelElement.appendChild(panelHeader);
            panelElement.appendChild(panelContent);
            element.appendChild(panelElement);
        }
        return element;
    }
}