function login(email, password) {
  fetch("/api/user/login", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      console.log({ res });
      if (res.auth) {
        window.localStorage.setItem("token", res.token);
        window.localStorage.setItem("name", res.name);
        window.location.replace("/");
      } else {
        document.getElementById("login-form-error").innerText = res.message;
      }
    })
    .catch((err) => {
      console.log({ err });
      // do something to show user error occurred
    });
}
function submitLogin(e) {
  e.preventDefault();
  console.log(e);
  const { email, password } = e.target.elements;
  login(email.value, password.value);
}
