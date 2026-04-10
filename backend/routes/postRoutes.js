import express from "express";
const router = express.Router();

router.post("/create", (req, res) => {
  res.send("Create post");
});

router.get("/", (req, res) => {
  res.send("Get all posts");
});

export default router;