const mongoose = require("mongoose");

const workSchema = new mongoose.Schema(
  {
    status: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    startDate: { type: Date },
    endDate: { type: Date },
    amount: { type: Number, default: 0 },
    materialType: { type: String, trim: true },
    finish: { type: String, trim: true },
    description: { type: String },
  },
  {
    timestamps: true,
  }
);

const Work = mongoose.models.Work || mongoose.model("Work", workSchema);

module.exports = Work;
