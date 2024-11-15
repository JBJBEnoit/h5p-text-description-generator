import ContentType from "./contentType.js";

export default class Dialogcards extends ContentType {
  constructor() {
    super();
    this.name = "Dialogcards";
  }

  parse(contentJson) {
    const content = JSON.parse(contentJson);
    const cards = content.dialogs;
    this.shuffleArray(cards);
    const details = this.createDetailsElement();
    const cardList = document.createElement("ol");
    const mainDescription = document.createElement("div");
    mainDescription.innerHTML =
      "<div>This activity contains a set of dialog cards, which are described below.</div>";
    mainDescription.innerHTML += `<div>&nbsp;</div>`;
    mainDescription.innerHTML += `<div>Activity Description or Instruction: ${this.stripEnclosingTags(
      content.description
    )}</div>`;
    details.appendChild(mainDescription);
    const answers = [];
    cards.forEach((card) => {
      const cardElement = document.createElement("li");
      const cardText = this.stripEnclosingTags(card.text);
      const cardImageAltText = card.imageAltText;
      const cardTips = Object.values(card.tips)
        .map((tip) => this.stripEnclosingTags(tip))
        .join(", ");
      const cardAnswer = this.stripEnclosingTags(card.answer);
      cardElement.innerHTML = `${cardText ? `Dialog Text: ${cardText}` : ""}`;
      cardElement.innerHTML += `${
        cardImageAltText ? `; Image Alt Text: ${cardImageAltText}` : ""
      }`;
      cardElement.innerHTML += `${cardTips ? `; (Tips: ${cardTips})` : ""}`;
      cardList.appendChild(cardElement);
      answers.push(cardAnswer);
    });
    details.appendChild(cardList);
    const answerList = document.createElement("ol");
    answers.forEach((answer) => {
      const answerElement = document.createElement("li");
      answerElement.textContent = answer;
      answerList.appendChild(answerElement);
    });

    const accordionHtml = this.addLineBreaksToHtml(details.outerHTML);
    const solution = this.addLineBreaksToHtml(answerList.outerHTML);
    return { accordionHtml, solution };
  }
}
