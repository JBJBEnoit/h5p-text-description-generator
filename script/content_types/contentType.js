export default class ContentType {
  stripHtml(html) {
    if (!html) {
      return "";
    }
    const div = document.createElement("div");
    div.innerHTML = html;
    const result = div.textContent || div.innerText || "";
    return result;
  }

  stripEnclosingTags(html) {
    if (!html) {
      return "";
    }
    const div = document.createElement("div");
    div.innerHTML = html;
    if (div.firstChild.nodeName === "P" || div.firstChild.nodeName === "DIV") {
      return div.firstChild.innerHTML;
    }
    return div.innerHTML;
  }

  createDetailsElement(description) {
    const details = document.createElement("details");
    const summary = document.createElement("summary");
    summary.innerHTML = description ? `<strong>${description}</strong>` : "<strong>Text Description</strong>";
    details.appendChild(summary);
    return details;
  }

  shuffleArray(array) {
    for (let i = array.length - 1; i >= 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  addLineBreaksToHtml(text) {
    const tagIndex = (t, i) => {
      const str = t.substring(i);
      const idx = str.search(/<\/?(details|summary|div|p|ul|ol|li)>/);
      if (idx === -1) {
        return idx;
      }
      return idx + i;
    };

    let index = tagIndex(text, 0);
    while (index !== -1) {
      if (index > 0 && text[index - 1] !== "\n") {
        text = text.substring(0, index) + "\n" + text.substring(index);
      }
      index = text.indexOf(">", index) + 1;
      if (index < text.length && text[index] !== "\n") {
        text = text.substring(0, index) + "\n" + text.substring(index);
      }
      index = tagIndex(text, index);
    }

    return text;
  }
}
