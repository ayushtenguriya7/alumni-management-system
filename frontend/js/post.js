const BASE_URL = "http://localhost:5000/api/posts";

export async function createPost(data) {
  const res = await fetch(`${BASE_URL}/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  return res.json();
}

export async function getPosts() {
  const res = await fetch(BASE_URL);
  return res.json();
}