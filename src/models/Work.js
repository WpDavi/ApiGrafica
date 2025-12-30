const mongoose = require("mongoose");

const workSchema = new mongoose.Schema(
  {
    status: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    fone: { type: String, required: true, trim: true },
    startDate: { type: Date },
    endDate: { type: Date },
    amount: { type: Number, default: 0 },
    serviceType: { type: String, trim: true },
    materialType: { type: String, trim: true },
    finish: { type: String, trim: true },
    description: { type: String },
    measure: { type: String },
    entryServiceValue: { type: String },
    serviceValue: { type: String },
    delyveryForecast: { type: String },
    image: { type: String },
  },

  {
    timestamps: true,
  }
);

const Work = mongoose.models.Work || mongoose.model("Work", workSchema);

module.exports = Work;
