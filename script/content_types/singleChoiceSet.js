import ContentType from "./contentType.js";

export default class SingleChoiceSet extends ContentType {
  constructor() {
    super();
    this.name = "SingleChoiceSet";
  }

  parse(contentJson) {
    const content = JSON.parse(contentJson);
    const questions = content.choices;
    const details = this.createDetailsElement();
    const questionList = document.createElement("ol");
    const correctAnswersList = document.createElement("ol");

    questions.forEach((question, index) => {
      const questionElement = document.createElement("li");
      questionElement.innerHTML = question.question;
      const answers = question.answers;
      const correctAnswerStr = answers[0];
      console.log(correctAnswerStr);
      this.shuffleArray(answers);
      const correctAnswerIndex = answers.indexOf(correctAnswerStr);
      const ol = document.createElement("ol");
      ol.type = "a";
      answers.forEach((answer) => {
        const li = document.createElement("li");
        li.textContent = this.stripHtml(answer);
        ol.appendChild(li);
      });
      questionElement.appendChild(ol);
      questionList.appendChild(questionElement);

      const correctAnswer = document.createElement("li");
      correctAnswer.textContent =
        String.fromCharCode(97 + correctAnswerIndex) +
        ". " +
        this.stripHtml(correctAnswerStr);
      correctAnswersList.appendChild(correctAnswer);
      details.appendChild(questionList);
      // if (index < questions.length - 1) {
      //     details.appendChild(document.createElement('hr'));
      // }
    });

    const accordionHtml = this.addLineBreaksToHtml(details.outerHTML);
    const solution = this.addLineBreaksToHtml(correctAnswersList.outerHTML);
    return { accordionHtml, solution };
  }
}
