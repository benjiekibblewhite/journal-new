const showError = (message) => {
  const errorTarget = document.getElementById("errors");
  errorTarget.innerHTML = `
      <p class='post-form__error'>${message}</p>
    `;
};

function handleSubmit(e) {
  e.preventDefault();
  const id = new URLSearchParams(window.location.search).get("id");
  const method = id ? "PUT" : "POST";
  const url = id ? `/api/posts/${id}` : "/api/posts";
  const { title, body } = e.target.elements;
  fetch(url, {
    method,
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
      const { id } = res;
      // TODO: return the id, and navigate to finished post
      window.location.replace(`/post?id=${id}`);
    })
    .catch((error) => showError(error.message));
}

function getPost(id) {
  return fetch(`/api/posts/${id}`)
    .then((res) => res.json())
    .then((res) => res)
    .catch(console.error);
}

function showPost(post) {
  document.getElementById("post-title").value = post.title;
  document.getElementById("post-body").value = post.body;
}

function init() {
  const id = new URLSearchParams(window.location.search).get("id");
  if (id) {
    getPost(id).then((res) => {
      showPost(res[0]);
    });
  }
}

init();
