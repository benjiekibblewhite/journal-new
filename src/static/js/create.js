const showError = (message) => {
  const errorTarget = document.getElementById("errors");
  errorTarget.innerHTML = `
      <p class='post-form__error'>${message}</p>
    `;
};

function handleSubmit(e) {
  console.log(e);
  e.preventDefault();
  const { title, body } = e.target.elements;
  fetch("/api/posts", {
    method: "POST",
    body: JSON.stringify({
      title: title.value,
      body: body.value,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      const { id } = res;
      // TODO: return the id, and navigate to finished post
      window.location.replace(`/post?id=${id}`);
    })
    .catch((error) => showError(error.message));
}
