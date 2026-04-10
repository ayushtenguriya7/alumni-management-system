import express from "express";
import Post from "../models/Post.js";

const router = express.Router();

// CREATE POST
router.post("/create", async (req, res) => {
  try {
    console.log("BODY:", req.body);

    const post = await Post.create(req.body);

    console.log("SAVED:", post);

    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// GET POSTS
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;