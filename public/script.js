//Create a "close button" and append it to each list item
var myNodeList = document.querySelectorAll("LI");

myNodeList.forEach(function (node) {
  var span = document.createElement("span");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  node.appendChild(span);
});

// Click on a close button to hide the current list item
var closeElements = Array.from(document.getElementsByClassName("close"));

closeElements.forEach(function (closeElement) {
  closeElement.onclick = function () {
    var div = this.parentElement;
    div.style.display = "none";
  };
});

//Add "checked" symbol when clicking on a list item
var list = document.querySelector("ul");
list.addEventListener(
  "click",
  function (ev) {
    if (ev.target.tagName === "LI") {
      ev.target.classList.toggle("checked");
    }
  },
  false
);

// Set focus back to the text box only after the form has been submitted
if (window.performance.navigation.type === 0) {
  // The page was reloaded, not navigated to via a link, so let's focus on the textbox
  document.getElementById("myInput").focus();
}
