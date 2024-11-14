import ContentType from "./contentType.js";

export default class DragText extends ContentType {
  constructor() {
    super();
    this.name = "DragText";
  }

  extractAnswers(textField) {
    const answers = [];
    let updatedText = textField.replace(/\*([^*]+)\*/g, (match, p1) => {
      let extractedText = p1;
      let extractedHint = null;
      if (p1.includes(":")) {
        extractedText = p1.substring(0, p1.indexOf(":"));
        extractedHint = p1.substring(p1.indexOf(":") + 1);
      }

      answers.push(extractedText); // Add the extracted text (without asterisks) to the array
      return "_____" + (extractedHint ? ` (Hint: ${extractedHint})` : ""); // Replace with four underscores
    });
    if (updatedText.includes("\n")) {
      updatedText = `<li>${updatedText}</li>`;
      updatedText = updatedText.replaceAll("\n", "</li><li>");
      updatedText = `<ol>${updatedText}</ol>`;
    }
    return { answers, updatedText };
  }

  parse(contentJson) {
    const content = JSON.parse(contentJson);
    //const textField = this.stripHtml(content.textField);
    const textField = content.textField;
    const taskDescription = this.stripHtml(content.taskDescription);
    const details = this.createDetailsElement();
    const { answers, updatedText } = this.extractAnswers(textField);
    this.shuffleArray(answers);
    const description = document.createElement("div");
    description.textContent = taskDescription;
    if (taskDescription && taskDescription.length > 0) {
      details.appendChild(description);
    }
    const question = document.createElement("div");
    question.innerHTML = updatedText;
    details.appendChild(question);
    const possibleAnswers = document.createElement("div");
    possibleAnswers.textContent = `Possible answers:`;
    details.appendChild(possibleAnswers);
    const ul = document.createElement("ul");
    answers.forEach((answer) => {
      const li = document.createElement("li");
      li.textContent = `${answer}`;
      ul.appendChild(li);
    });
    details.appendChild(ul);
    const accordionHtml = this.addLineBreaksToHtml(details.outerHTML);

    let isClosingTag = false;
    let index = 0;
    let solution = textField;
    while (index < solution.length) {
      if (solution.charAt(index) === "*" && !isClosingTag) {
        solution =
          solution.substring(0, index + 1) +
          "<strong><em>" +
          solution.substring(index + 1);
        isClosingTag = true;
      } else if (solution.charAt(index) === "*" && isClosingTag) {
        solution =
          solution.substring(0, index + 1) +
          "</em></strong>" +
          solution.substring(index + 1);
        isClosingTag = false;
      }
      index++;
    }

    solution = solution.replaceAll(/\:([^*]+)\*/g, ""); // Remove the hints
    solution = solution.replaceAll("*", ""); // Remove the remaining asterisks
    if (solution.includes("\n")) {
      solution = `<li>${solution}</li>`;
      solution = solution.replaceAll("\n", "</li><li>");
      solution = `<ol>${solution}</ol>`;
    }
    solution = this.addLineBreaksToHtml(solution);
    return { accordionHtml, solution };
  }
}
