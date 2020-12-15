// check for login in local storage

const userName = window.localStorage.getItem("name");

function init() {
  if (!userName) {
    window.location.replace("/login");
  }
}

init();
