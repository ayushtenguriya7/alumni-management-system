import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
  status: { type: String, enum: ["applied", "interviewing", "rejected", "accepted"], default: "applied" }
}, { timestamps: true });

export default mongoose.model("Application", applicationSchema);
