import ContentType from "./contentType.js";

export default class TrueFalse extends ContentType {
  constructor() {
    super();
    this.name = "TrueFalse";
  }

  parse(contentJson) {
    const content = JSON.parse(contentJson);
    const questionStr = this.stripEnclosingTags(content.question);
    const details = this.createDetailsElement();
    const questionElement = document.createElement("div");
    questionElement.innerHTML = questionStr;
    
    const answerList = [];
    let correctChoice = content.correct;
    if (correctChoice === "true") {
      correctChoice = content.l10n.trueText;
    } else {
        correctChoice = content.l10n.falseText;
    }   
    const correctAnswer = document.createElement("div");
    correctAnswer.innerHTML = `Correct answer: ${correctChoice}`;
    questionElement.innerHTML += ` (${content.l10n.trueText}/${content.l10n.falseText})`;
    details.appendChild(questionElement);
    const accordionHtml = details.outerHTML;
    const solution = correctAnswer.outerHTML;
    return { accordionHtml, solution };
  }
}