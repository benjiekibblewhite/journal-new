function setError(message) {
  document.getElementById("register-form-error").innerText = message;
}

function register(name, email, password) {
  fetch("/api/user/register", {
    method: "POST",
    body: JSON.stringify({
      name,
      email,
      password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.auth) {
        window.localStorage.setItem("name", res.name);
        window.location.replace("/");
      } else {
        setError(res.message);
      }
    })
    .catch((err) => {
      console.log({ err });
      // do something to show user error occurred
    });
}
function submitRegister(e) {
  e.preventDefault();
  const { name, email, password, passwordConfirm } = e.target.elements;
  if (password.value != passwordConfirm.value) {
    setError("Passwords must match");
    return;
  }
  register(name.value, email.value, password.value);
}
