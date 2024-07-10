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

function translate(){
    const inputText = inputTextElement.value;
    const inputLanguage = inputLanguageDropdown.querySelector(".selected").dataset.value;
    const outputLanguage = outputLanguageDropdown.querySelector(".selected").dataset.value;

    const url = 

}