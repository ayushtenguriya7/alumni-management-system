import express from "express";
import Meeting from "../models/Meeting.js";

const router = express.Router();

// GET meetings for user
router.get("/:userId", async (req, res) => {
  try {
    const meetings = await Meeting.find({
      $or: [{ studentId: req.params.userId }, { alumniId: req.params.userId }]
    })
    .populate("studentId", "name email")
    .populate("alumniId", "name email role")
    .sort({ date: 1 });
    res.json(meetings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create meeting
router.post("/create", async (req, res) => {
  try {
    const meeting = await Meeting.create(req.body);
    res.json({ message: "Meeting scheduled", meeting });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
