import mongoose from "mongoose";

const statsSchema = new mongoose.Schema({
  aiTutor: { type: Number, default: 0 },
  explain: { type: Number, default: 0 },
  quiz: { type: Number, default: 0 },
  roadmap: { type: Number, default: 0 },
  career: { type: Number, default: 0 },
  activity: {
    type: [String],
    default: [],
  },
});

export default mongoose.model("Stats", statsSchema);