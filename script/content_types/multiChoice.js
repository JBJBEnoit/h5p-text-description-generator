import ContentType from "./contentType.js";

export default class MultiChoice extends ContentType {
  constructor() {
    super();
    this.name = "MultiChoice";
  }

  parse(contentJson) {
    const content = JSON.parse(contentJson);
    //console.log("MultiChoice content:", content.question);
    const questionStr = this.stripEnclosingTags(content.question.replace(/(&(?:amp;)?nbsp;)+(?=\s*<\/(li|p)>)/gi, ''));
    const answers = content.answers;
    this.shuffleArray(answers);
    const details = this.createDetailsElement();
    const questionElement = document.createElement("div");
    questionElement.innerHTML = questionStr;
    details.appendChild(questionElement);
    const answerList = document.createElement("ol");
    answerList.type = "a";
    const correctAnswers = document.createElement("div");
    correctAnswers.innerHTML = "Correct answer(s): ";
    const numCorrect = answers.filter((answer) => answer.correct).length;
    answers.forEach((answer, index) => {
      //console.log("MultiChoice answer:", answer.text);
      const text = this.stripEnclosingTags(answer.text.replace(/(&(?:amp;)?nbsp;)+(?=\s*<\/(div|p|li)>)/gi, ''));
      const li = document.createElement("li");
      li.textContent = text;
      let correctAppended = 0;
      answerList.appendChild(li);
      if (answer.correct) {
        correctAnswers.innerHTML +=
          String.fromCharCode(97 + index) + ". " + text;
        if (numCorrect > 1 && correctAppended < numCorrect) {
          correctAnswers.innerHTML += "; ";
        }
        correctAppended++;
      }
    });
    details.appendChild(answerList);
    const accordionHtml = this.addLineBreaksToHtml(details.outerHTML);
    const solution = this.addLineBreaksToHtml(correctAnswers.outerHTML);
    return { accordionHtml, solution };
  }
}
