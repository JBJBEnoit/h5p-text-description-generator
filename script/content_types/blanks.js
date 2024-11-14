import ContentType from "./contentType.js";

export default class Blanks extends ContentType {
    
        constructor() {
            super();
            this.name = 'Blanks';
        }
    
        extractAnswers(textField) {
            const answers = [];
            let updatedText = textField.replace(/\*([^*]+)\*/g, (match, p1) => {
                let extractedText = p1;
                let extractedHint = null;
                if (p1.includes(':')) {
                    extractedText = p1.substring(0, p1.indexOf(':'));
                    extractedHint = p1.substring(p1.indexOf(':') + 1);
                }
    
                answers.push(extractedText);  // Add the extracted text (without asterisks) to the array
                return '_____' + (extractedHint ? ` (Hint: ${extractedHint})` : '');            // Replace with four underscores
            });
            // if (updatedText.includes('\n')) {
            //     updatedText = `<li>${updatedText}</li>`;
            //     updatedText = updatedText.replaceAll('\n', '</li><li>');
            //     updatedText = `<ol>${updatedText}</ol>`;
            // }
            return {answers, updatedText};
        }
    
        parse(contentJson) {

            const content = JSON.parse(contentJson);
            
            
            const details = this.createDetailsElement();
            const contentQuestions = content.questions;
            const totalAnswers = [];
            const questions = [];
            contentQuestions.forEach((question) => {
                const {answers, updatedText} = this.extractAnswers(question);
                totalAnswers.push(answers);
                questions.push(updatedText);
            });
            const questionString = questions.join('');
            const question = document.createElement('div');
            question.innerHTML = questionString;
            details.appendChild(question);
            const accordionHtml = this.addLineBreaksToHtml(details.outerHTML);
    
            let isClosingTag = false;
            let index = 0;
            let solution = content.questions.join('');
            while (index < solution.length) {
                if (solution.charAt(index) === '*' && !isClosingTag) {
                    solution = solution.substring(0, index + 1) + '<strong><em>' + solution.substring(index + 1);
                    isClosingTag = true;
                } else if (solution.charAt(index) === '*' && isClosingTag) {
                    solution = solution.substring(0, index + 1) + '</em></strong>' + solution.substring(index + 1);
                    isClosingTag = false;
                }
                index++;
            }
    
            solution = solution.replaceAll(/\:([^*]+)\*/g, ''); // Remove the hints
            solution = solution.replaceAll('*', ''); // Remove the remaining asterisks
            // if (solution.includes('\n')) {
            //     solution = `<li>${solution}</li>`;
            //     solution = solution.replaceAll('\n', '</li><li>');
            //     solution = `<ol>${solution}</ol>`;
            // }
            solution = this.addLineBreaksToHtml(solution);
            return {accordionHtml, solution};   
        }
    }