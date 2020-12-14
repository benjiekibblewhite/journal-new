// check for tokens in local storage

const token = window.localStorage.getItem("token");
const name = window.localStorage.getItem("name");

function init() {
  if (!token) {
    window.location.replace("/login");
  }
}

init();
