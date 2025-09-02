const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  title: { type: String, required: true, text: true },
  body: { type: String, required: true, text: true },
  tags: [{ type: String, index: true }],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  votes: { type: Number, default: 0 },
  answersCount: { type: Number, default: 0 }
}, { timestamps: true });

// create text index for full-text search
questionSchema.index({ title: "text", body: "text" });

module.exports = mongoose.model("Question", questionSchema);
