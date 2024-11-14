import ContentType from "./contentType.js";

export default class Flashcards extends ContentType {
  constructor() {
    super();
    this.name = "Flashcards";
  }

  parse(contentJson) {
    const content = JSON.parse(contentJson);
    const cards = content.cards;
    this.shuffleArray(cards);
    const details = this.createDetailsElement();
    const cardList = document.createElement("ol");
    const mainDescription = document.createElement("div");
    mainDescription.innerHTML =
      "<div>This activity contains a set of flashcards, which are described below.</div>";
    mainDescription.innerHTML += `<div>&nbsp;</div>`;
    mainDescription.innerHTML += `<div>Activity Description or Instruction: ${content.description}</div>`;
    details.appendChild(mainDescription);
    const answers = [];
    cards.forEach((card, index) => {
      const cardElement = document.createElement("li");
      const cardImageAltText = card.imageAltText;
      const cardText = this.stripEnclosingTags(card.text);
      const cardAnswer = this.stripEnclosingTags(card.answer);
      const cardTip = this.stripEnclosingTags(card.tip);
      cardElement.innerHTML = `${cardText ? `Card Text: ${cardText}` : ""} ${
        cardImageAltText ? `Image Alt Text: ${cardImageAltText}` : ""
      } ${cardTip ? `(Hint: ${cardTip})` : ""}`;
      cardList.appendChild(cardElement);
      answers.push(cardAnswer);
    });
    details.appendChild(cardList);
    const answerList = document.createElement("ol");
    answers.forEach((answer, index) => {
      const answerElement = document.createElement("li");
      answerElement.textContent = answer;
      answerList.appendChild(answerElement);
    });

    const accordionHtml = this.addLineBreaksToHtml(details.outerHTML);
    const solution = this.addLineBreaksToHtml(answerList.outerHTML);
    return { accordionHtml, solution };
  }
}
