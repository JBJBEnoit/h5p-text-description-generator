import CompositeContentType from "./compositeContentType.js";

export default class Column extends CompositeContentType {
    constructor(h5p2Text) {
        super(h5p2Text);
        this.name = "Column";
    }
    
    parse(contentJson) {
        const content = JSON.parse(contentJson);
        const libraries = content.content;
        const details = this.createDetailsElement();
        const columnSolution = document.createElement("div");
        libraries.forEach((library, index) => {
            let libraryType = library.content.library.replace("H5P.", "");
            libraryType = libraryType.substring(0, libraryType.indexOf(" "));    
            const typeInstance = this.h5p2Text.getTypeInstance(libraryType);
            if (!typeInstance) {
                console.error(`No content type found for library ${libraryType}`);
                return;
            }
            const {accordionHtml, solution} = typeInstance.parse(JSON.stringify(library.content.params));
            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = accordionHtml;
            const accordion = tempDiv.querySelector("details");
            const summary = accordion.querySelector("summary");
            accordion.removeChild(summary);
            details.innerHTML += `<div style='margin: 1em 0 1em 0;'><strong>${libraryType} Activity</strong></div>`;
            details.innerHTML += accordion.innerHTML;
            columnSolution.innerHTML += `<div style='margin: 1em 0 1em 0;'><strong>${libraryType} Activity</strong></div>`;
            columnSolution.innerHTML += solution;
        });

        return {accordionHtml: details.outerHTML, solution: columnSolution.outerHTML};
        
    }
}