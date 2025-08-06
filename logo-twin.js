const elements = document.querySelectorAll("[logo-twin-trigger]");
elements.forEach((element) => {
  const clone = element.cloneNode(true);
  clone.classList.add("logo-twin");
  element.parentNode.insertBefore(clone, element.nextSibling);
});
