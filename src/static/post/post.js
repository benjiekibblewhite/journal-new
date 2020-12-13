const titleTarget = document.getElementById("post-title");
const postTarget = document.getElementById("post-body");

const updateTitle = (title) => (titleTarget.innerText = title);

const EditLink = (id) =>
  `<a href='/edit?id=${id}' class='post__edit-link'>Edit Post</a>`;

const DeleteButton = (id) =>
  `<button data-id='${id}' class='post__delete-button'>Delete Post</button>`;

const Post = ({ created_at, updated_at, body, id }) => `
<article class='post'>
  <header>
    <p class='post__time'>Posted <time datetime='${created_at}'>${created_at}</time></p>
    ${
      updated_at
        ? `<p class='post__time'>Posted <time datetime='${created_at}>${created_at}</time>'</p>`
        : ""
    }
    <section class='post__body'>${body}</section>
    ${DeleteButton(id)} ${EditLink(id)}
  </header>
</article>`;

function getPost(id) {
  return fetch(`/api/posts/${id}`)
    .then((res) => res.json())
    .then((res) => res)
    .catch(console.error);
}

function showPost(post) {
  postTarget.innerHTML = Post(post);
  updateTitle(post.title);
}

function deletePost(id) {
  fetch(`/api/posts/${id}`, {
    method: "DELETE",
  })
    .then((res) => {
      window.location.replace("/posts");
    })
    .catch(console.error);
}

function attachDeleteListeners() {
  const deleteButtons = document.querySelectorAll(".post__delete-button");
  deleteButtons.forEach((target) => {
    target.addEventListener("click", () => deletePost(target.dataset.id));
  });
}

async function init() {
  updateTitle("Loading...");
  const id = new URLSearchParams(window.location.search).get("id");
  getPost(id).then((res) => {
    showPost(res[0]);
    attachDeleteListeners();
  });
}

init();
