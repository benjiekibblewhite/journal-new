const titleTarget = document.getElementById("post-title");
const postTarget = document.getElementById("post-body");

const updateTitle = (title) => (titleTarget.innerText = title);

const Post = ({ created_at, updated_at, title, body }) => `
<article class='post'>
  <header>
    <p class='post__time'>Posted <time datetime='${created_at}'>${created_at}</time></p>
    ${
      updated_at
        ? `<p class='post__time'>Posted <time datetime='${created_at}>${created_at}</time>'</p>`
        : ""
    }
    <section class='post__body'>${body}</section>
  </header>
</article>`;

function getPost(id) {
  return fetch(`/api/posts/${id}`)
    .then((res) => res.json())
    .then((res) => res)
    .catch(console.error);
}

function showPost(post) {
  console.log(post);
  postTarget.innerHTML = Post(post);
  updateTitle(post.title);
}

async function init() {
  updateTitle("Loading...");
  const id = new URLSearchParams(window.location.search).get("id");
  getPost(id).then((res) => showPost(res[0]));
}

init();
