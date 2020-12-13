function openNavigation() {
  const sidebar = document.querySelectorAll(".menu__overlay");
  sidebar[0].classList.add("open");
}

function closeNavigation() {
  const sidebar = document.querySelectorAll(".menu__overlay");
  sidebar[0].classList.remove("open");
}

document
  .querySelectorAll(".menu__open-button")[0]
  .addEventListener("click", openNavigation);
document
  .querySelectorAll(".menu__close-button")[0]
  .addEventListener("click", closeNavigation);
document
  .querySelectorAll(".menu__overlay")[0]
  .addEventListener("click", closeNavigation);
