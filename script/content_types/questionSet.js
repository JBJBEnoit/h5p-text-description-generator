import CompositeContentType from "./compositeContentType.js";

export default class QuestionSet extends CompositeContentType {
    constructor(h5p2Text) {
        super(h5p2Text);
        this.name = "QuestionSet";
    }

    parse(contentJson) {
        const content = JSON.parse(contentJson);
        const libraries = content.questions;
        const details = this.createDetailsElement("Quiz Text Description");
        //const columnSolution = document.createElement("div");
        const columnSolution = document.createElement("ol");
        let questionNumber = 1;
        libraries.forEach((library, index) => {
            let libraryType = library.library.replace("H5P.", "");
            libraryType = libraryType.substring(0, libraryType.indexOf(" "));    
            const typeInstance = this.h5p2Text.getTypeInstance(libraryType);
            if (!typeInstance) {
                console.error(`No content type found for library ${libraryType}`);
                return;
            }
            const {accordionHtml, solution} = typeInstance.parse(JSON.stringify(library.params));
            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = accordionHtml;
            const accordion = tempDiv.querySelector("details");
            const summary = accordion.querySelector("summary");
            accordion.removeChild(summary);
            details.innerHTML += `<div style='margin: 1em 0 1em 0;'><strong>${questionNumber}. ${libraryType} Activity</strong></div>`;
            details.innerHTML += accordion.innerHTML;
            //columnSolution.innerHTML += `<div style='margin: 1em 0 1em 0;'><strong>${libraryType} Activity</strong></div>`;
            //generalize this to handle different library types
            // each library can expose its solution prefix, to be trimmed in the case of a list of questions like this
            //columnSolution.innerHTML += '<div>' + questionNumber + '. ' + solution.substring(solution.indexOf(":") + 2).trim() + '</div>';
            const solutionItem = document.createElement("li");
            solutionItem.innerHTML = solution.substring(solution.indexOf(":") + 2).trim();
            columnSolution.appendChild(solutionItem);

            questionNumber++;
        });

        return {accordionHtml: details.outerHTML, solution: columnSolution.outerHTML};
    }
        
}
