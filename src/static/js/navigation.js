function openNavigation() {
  const sidebar = document.querySelectorAll(".menu__overlay");
  sidebar[0].classList.add("open");
}

function closeNavigation() {
  const sidebar = document.querySelectorAll(".menu__overlay");
  sidebar[0].classList.remove("open");
}

function logout() {
  localStorage.removeItem("name");
  window.location.replace("/login");
}

function showName() {
  const name = window.localStorage.getItem("name");
  document.getElementById("menu__user-name").innerText = name;
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

showName();
