const titleTarget = document.getElementById("post-title");
const postTarget = document.getElementById("post-body");

const updateTitle = (title) => (titleTarget.innerText = title);

const EditLink = (id) =>
  `<a href='/edit?id=${id}' class='post__edit-link link-as-button secondary'>Edit Post</a>`;

const DeleteButton = (id) =>
  `<button data-id='${id}' class='post__delete-button'>Delete Post</button>`;

const Post = ({ created_at, updated_at, body, id }) => `
<article class='post'>
  <header>
    <p class='post__time'><time datetime='${created_at}'>${new Date(
  created_at
).toDateString()}</time></p>
    <section class='post__body'>${body}</section>
    <div class='post__buttons'>
      ${EditLink(id)} ${DeleteButton(id)} 
    </div>
  </header>
</article>`;

function getPost(id) {
  return fetch(`/api/posts/${id}`)
    .then((res) => res.json())
    .then((res) => console.log(res) || res)
    .catch(console.error);
}

function showPost(post) {
  postTarget.innerHTML = Post(post);
  updateTitle(post.title);
}

function deletePost(id) {
  if (confirm("Are you sure? This cannot be undone")) {
    fetch(`/api/posts/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        window.location.replace("/");
      })
      .catch(console.error);
  }
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
