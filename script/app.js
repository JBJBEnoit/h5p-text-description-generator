import DragText from "./content_types/dragText.js";
import Blanks from "./content_types/blanks.js";
import SingleChoiceSet from "./content_types/singleChoiceSet.js";
import MultiChoice from "./content_types/multiChoice.js";
import Flashcards from "./content_types/flashCards.js";
import Dialogcards from "./content_types/dialogCards.js";
import TrueFalse from "./content_types/trueFalse.js";
import Column from "./content_types/column.js";
import QuestionSet from "./content_types/questionSet.js";
import H5P2Text from "./h5p2Text.js";

function isH5PFile(file) {
  return file.name.match(/.+\.h5p$/);
}

// handle files dragged and dropped into text editor
function dropHandler(ev) {
  console.log("File(s) dropped");

  // Prevent default behavior (Prevent file from being opened)
  ev.preventDefault();
  if (ev.dataTransfer.items) {
    let item = ev.dataTransfer.items[0];
    if (item.kind === "file") {
      const file = item.getAsFile();

      // If isn't H5P file
      if (!isH5PFile(file)) {
        //Some kind of error message
        alert(file.name + " is not an H5P file");
        return;
      }

      // Check and replace `.h5p` extension with `.zip`
      const newFileName = file.name.replace(/\.h5p$/, ".zip");
      const zipFile = new File([file], newFileName, {
        type: "application/zip",
      });

      // Otherwise it's an H5P file
      unzipAndReadH5PFile(zipFile);
    }
  } else {
    // Use DataTransfer interface to access the file(s)
    readFile(ev.dataTransfer.files[0]);
  }
}

// handle files being dragged over text editor
function dragOverHandler(ev) {
  console.log("File(s) in drop zone");

  // Prevent default behavior (Prevent file from being opened)
  ev.preventDefault();
}

// upload file
const fileUploader = () => {
  let input = document.createElement("input");
  input.type = "file";

  input.onchange = async (e) => {
    // getting a hold of the file reference
    let file = e.target.files[0];
    if (!isH5PFile(file)) {
      //Some kind of error message
      alert(file.name + " is not an H5P file");
      return;
    }

    unzipAndReadH5PFile(file);
    return;
  };

  // activate the upload
  input.click();
};

// unzip FOL Help file and read into images and state variables
const unzipAndReadH5PFile = async (file) => {
  let zip = new JSZip();
  let loaded_files = await zip.loadAsync(file);

  const converter = new H5P2Text();
  try {
    converter.addContentType(new DragText());
    converter.addContentType(new Blanks());
    converter.addContentType(new SingleChoiceSet());
    converter.addContentType(new MultiChoice());
    converter.addContentType(new Flashcards());
    converter.addContentType(new Dialogcards());
    converter.addContentType(new TrueFalse());
    converter.addContentType(new Column(converter));
    converter.addContentType(new QuestionSet(converter));
  } catch (err) {
    document.getElementById("errorContainer").innerHTML = err;
    console.log(err);
  }

  try {
    const { accordionHtml, solution } = await converter.parse(loaded_files);
    document.getElementById("preview_container").innerHTML = accordionHtml;
    document.getElementById("html_output").value = accordionHtml;
    document.getElementById("answer_preview").innerHTML = solution;
    document.getElementById("answer_output").value = solution;
    console.log(accordionHtml);
    console.log(solution);
  } catch (err) {
    document.getElementById("errorContainer").innerHTML = err;
    console.log(err);
  }
};

const copyContents = (target) => {
  let copyText = document.getElementById(target);
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(copyText.value);
  window.parent.postMessage({ content: copyText.value }, "*");
  alert("Copied to clipboard");
};

// page initialization
document.addEventListener("DOMContentLoaded", function () {
  let dropZone = document.getElementById("drop_zone");
  dropZone.addEventListener("dragover", dragOverHandler);
  dropZone.addEventListener("drop", dropHandler);
  dropZone.addEventListener("click", fileUploader);
  this.getElementById("copy_text").addEventListener("click", () =>
    copyContents("html_output")
  );
  this.getElementById("copy_answer").addEventListener("click", () =>
    copyContents("answer_output")
  );
});
