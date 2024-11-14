import ContentType from "./contentType.js";

export default class SingleChoiceSet extends ContentType {
    constructor() {
        super();
        this.name = 'SingleChoiceSet';
    }

    parse(contentJson) {
        const content = JSON.parse(contentJson);
        const questions = content.questions;
        const details = this.createDetailsElement();
        const questionList = document.createElement('ol');
        const correctAnswersList = document.createElement('ol');

        questions.forEach((question, index) => {
            const questionElement = document.createElement('li');
            questionElement.innerHTML = question.question;
            const correctAnswerStr = question.answers[0];
            const answers = this.shuffleArray(question.answers);
            const correctAnswerIndex = answers.indexOf(correctAnswerStr);
            const ol = document.createElement('ol');
            ol.type = 'a';
            answers.forEach((answer) => {
                const li = document.createElement('li');
                li.textContent = answer.text;
                ol.appendChild(li);
            });
            questionElement.appendChild(ul);
            questionList.appendChild(questionElement);

            const correctAnswer = document.createElement('li');
            correctAnswer.textContent = String.fromCharCode(97 + correctAnswerIndex);
            correctAnswersList.appendChild(correctAnswer);
            details.appendChild(questionList);
            // if (index < questions.length - 1) {
            //     details.appendChild(document.createElement('hr'));
            // }
        });

        const accordionHtml = this.addLineBreaksToHtml(details.outerHTML);
        const solution = this.addLineBreaksToHtml(correctAnswersList.outerHTML);
        return { accordionHtml, solution};
    }
}