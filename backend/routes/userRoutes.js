import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

const router = express.Router();

const CURRENT_YEAR = new Date().getFullYear();

// SIGNUP
router.post("/register", async (req, res) => {
  try {
    console.log("BODY RECEIVED:", req.body);
    const { name, collegeId, email, password, graduationYear } = req.body;

    // role logic
    const role = graduationYear < CURRENT_YEAR ? "alumni" : "student";

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      collegeId,
      email,
      password: hashedPassword,
      graduationYear,
      role
    });

    res.json({ message: "Signup successful, please login" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// LOGIN
router.post("/login", async (req, res) => {
  const { collegeId, password } = req.body;

  const user = await User.findOne({ collegeId });

  if (!user) return res.status(400).json({ error: "User not found" });

  const match = await bcrypt.compare(password, user.password);

  if (!match) return res.status(400).json({ error: "Invalid password" });

  res.json({
    role: user.role,
    name: user.name,
    userId: user._id
  });
});

// GET STATS (TOTAL ALUMNI)
router.get("/stats", async (req, res) => {
  try {
    const totalAlumni = await User.countDocuments({ role: "alumni" });
    res.json({ totalAlumni });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET PROFILE
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if(!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE PROFILE
router.put("/profile/:id", async (req, res) => {
  try {
    const { aboutMe, department, contactNumber, company, jobType } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { aboutMe, department, contactNumber, company, jobType },
      { new: true, runValidators: true }
    ).select("-password");

    if(!user) return res.status(404).json({ error: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;