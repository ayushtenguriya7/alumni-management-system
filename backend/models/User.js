import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  collegeId: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String,
  graduationYear: Number,
  role: {
    type: String,
    enum: ["admin", "alumni", "student"]
  },
  aboutMe: { type: String, default: "" },
  department: { type: String, default: "" },
  contactNumber: { type: String, default: "" },
  company: { type: String, default: "" },
  jobType: { type: String, default: "" }
}, { timestamps: true });

export default mongoose.model("User", userSchema);