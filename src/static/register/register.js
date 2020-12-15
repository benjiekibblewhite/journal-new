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
        document.getElementById("register-form-error").innerText = res.message;
      }
    })
    .catch((err) => {
      console.log({ err });
      // do something to show user error occurred
    });
}
function submitRegister(e) {
  e.preventDefault();
  console.log(e);
  const { name, email, password } = e.target.elements;
  register(name.value, email.value, password.value);
}
