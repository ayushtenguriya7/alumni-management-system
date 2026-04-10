import { createPost, getPosts } from "./post.js";
import { renderPosts } from "./ui.js";

const postBtn = document.getElementById("postBtn");

postBtn.addEventListener("click", async () => {
  const data = {
    title: document.getElementById("title").value,
    company: document.getElementById("company").value,
    link: document.getElementById("link").value,
    description: document.getElementById("description").value
  };

  console.log("Sending:", data);

  await createPost(data);

  // clear inputs
  document.getElementById("title").value = "";
  document.getElementById("company").value = "";
  document.getElementById("link").value = "";
  document.getElementById("description").value = "";

  loadPosts();
});

async function loadPosts() {
  const posts = await getPosts();
  console.log("Fetched:", posts);
  renderPosts(posts);
}

loadPosts();