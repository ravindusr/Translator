const dropdowns = document.querySelectorAll(".dropdown-container"),
  inputLanguageDropdown = document.querySelector("#input-language"),
  outputLanguageDropdown = document.querySelector("#output-language");

function populateDropdown(dropdown, options) {
  dropdown.querySelector("ul").innerHTML = "";
  options.forEach((option) => {
    const li = document.createElement("li");
    const title = option.name + " (" + option.native + ")";
    li.innerHTML = title;
    li.dataset.value = option.code;
    li.classList.add("option");
    dropdown.querySelector("ul").appendChild(li);
  });
}

populateDropdown(inputLanguageDropdown, languages);
populateDropdown(outputLanguageDropdown, languages);

dropdowns.forEach((dropdown) => {
  dropdown.addEventListener("click", (e) => {
    dropdown.classList.toggle("active");
  });

  dropdown.querySelectorAll(".option").forEach((item) => {
    item.addEventListener("click", (e)=>{

        dropdown.querySelectorAll(".option").forEach((item) => {
            item.classList.remove("active");
        });

        item.classList.add("active");
        const selected = dropdown.querySelector(".selected");
        selected.innerHTML = item.innerHTML;
        selected.dataset.value =item.dataset.value;
        translate();
    });
  });

});

document.addEventListener("click", (e) => {
  dropdowns.forEach((dropdown) => {
    if (!dropdown.contains(e.target)) {
      dropdown.classList.remove("active");
    }
  });
});

//translate function
const inputTextElement =document.querySelector("#input-text");
const outputTextElement =document.querySelector("#output-text");
const inputLanguage =inputLanguageDropdown.querySelector(".selected");
const outputLanguage =outputLanguageDropdown.querySelector(".selected");
const swapBtn = document.querySelector(".swap-possition");

function translate(){
    const inputText = inputTextElement.value;
    const inputLanguage = inputLanguageDropdown.querySelector(".selected").dataset.value;
    const outputLanguage = outputLanguageDropdown.querySelector(".selected").dataset.value;

    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${inputLanguage}&tl=${outputLanguage}&dt=t&q=${encodeURI(
        inputText
      )}`;

      fetch(url)
        .then((response) => response.json())
        .then((json) => {
            outputTextElement.value = json[0].map((item) => item[0]).join("");
        })
        .catch((error) => {
            console.log(error);
        })
}

inputTextElement.addEventListener("input", (e) => {
    if(inputTextElement.value.length > 5000){
        inputTextElement.value = inputTextElement.value.slice(0, 5000);
    }
    translate();
});

swapBtn.addEventListener("click", (e) => {
    const temp = inputLanguage.innerHTML;
    inputLanguage.innerHTML =outputLanguage.innerHTML;
    outputLanguage.innerHTML = temp;

    const tempvalue = inputLanguage.dataset.value;
    inputLanguage.dataset.value = outputLanguage.dataset.value;
    outputLanguage.dataset.value = tempvalue;

    const tempInputText = inputTextElement.value;
    inputTextElement.value = outputTextElement.value;
    outputTextElement.value = tempInputText;

    translate();
});

const uploadDoc = document.querySelector("#upload-document"),
    uploadTitle = document.querySelector("#upload-title");

uploadDoc.addEventListener("change",(e) => {
        const file = e.target.files[0];
        if(
            file.type ==="application/pdf" ||
            file.type ==="application/msword" ||
            file.type ==="text/plain" 
        ){
            uploadTitle.innerHTML = file.name;
            const reader = new FileReader();
            reader.readAsText(file);
            reader.onload = (e) => {
                inputTextElement.value = e.target.result;
                translate();
            };
        }else{
            alert("Please Enter Valid file");
        }
    });

const downloadDoc = document.querySelector("#download-document");

downloadDoc.addEventListener("click", (e) => {
    const outputText = outputTextElement.value;
    const outputLanguage = outputLanguageDropdown.querySelector(".selected").innerHTML;
    if (outputText) {
        const blob = new Blob([outputText], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.download = `translated-to-${outputLanguage}.txt`;
        a.href = url;
        a.click();
      }
    });

const inputChars = document.querySelector("#input-chars");


inputTextElement.addEventListener("input" , (e) => {
    inputChars.innerHTML = e.target.value.length;
});


function outputcopyText() {
    var textArea = document.getElementById("output-text");

    textArea.select();
    textArea.setSelectionRange(0, 99999); // For mobile devices

    document.execCommand("copy");

    swal ( "Text Copied to Clipboard." ,  "" ,  "success" )
}

function inputcopyText() {
    var textArea = document.getElementById("input-text");

    textArea.select();
    textArea.setSelectionRange(0, 99999); // For mobile devices

    document.execCommand("copy");

    swal ( "Text Copied to Clipboard." ,  "" ,  "success" )
}


