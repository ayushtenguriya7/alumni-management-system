import express from "express";
import Application from "../models/Application.js";

const router = express.Router();

// GET applications for user
router.get("/:userId", async (req, res) => {
  try {
    const apps = await Application.find({ studentId: req.params.userId })
    .populate("postId")
    .sort({ createdAt: -1 });
    res.json(apps);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create application
router.post("/create", async (req, res) => {
  try {
    const app = await Application.create(req.body);
    res.json({ message: "Applied successfully", application: app });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
