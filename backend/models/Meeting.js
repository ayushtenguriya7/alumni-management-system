import mongoose from "mongoose";

const meetingSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  alumniId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, required: true },
  topic: String,
  status: { type: String, enum: ["scheduled", "completed", "cancelled"], default: "scheduled" }
}, { timestamps: true });

export default mongoose.model("Meeting", meetingSchema);
