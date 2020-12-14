const postsTarget = document.getElementById("posts");
const setLoading = () => (postsTarget.innerHTML = "<p>Loading...</p>");

const PostList = (posts) => {
  let html = "<ul class='post-list'>";
  posts.forEach((post) => (html += Post(post)));
  html += "</ul>";
  return html;
};

const Post = ({ id, created_at, title }) => `<li class='post-list__item'>
  <a href='/post?id=${id}'>${title} - <span class='post-list__item--date'>${new Date(
  created_at
).toDateString()}</span></a>
</li>`;

function getPosts() {
  const token = window.localStorage.getItem("token");

  return fetch("/api/posts", {
    method: "GET",
    headers: {
      "x-access-token": token,
    },
  })
    .then((res) => res.json())
    .then((res) => res)
    .catch(console.error);
}

function showPosts(posts) {
  postsTarget.innerHTML = PostList(posts);
}

async function init() {
  setLoading();
  getPosts().then(showPosts);
}

init();
