const mongoose = require("mongoose");

const workSchema = new mongoose.Schema(
  {
    status: { type: String, required: true, trim: true }, // status do serviço
    name: { type: String, required: true, trim: true },
    fone: { type: String, required: true, trim: true },
    designer: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },

    paid: { type: Boolean },

    numbered: { type: Boolean },
    chopped: { type: Boolean },
    routes: { type: String },
    format: { type: String },

    amount: { type: String },
    serviceType: { type: String, trim: true },
    materialType: { type: String, trim: true },
    finish: { type: String, trim: true },
    description: { type: String },
    measure: { type: String },
    value: { type: Number },

    amount2: { type: String },
    serviceType2: { type: String, trim: true },
    materialType2: { type: String, trim: true },
    finish2: { type: String, trim: true },
    description2: { type: String },
    measure2: { type: String },
    value2: { type: Number },

    amount3: { type: String },
    serviceType3: { type: String, trim: true },
    materialType3: { type: String, trim: true },
    finish3: { type: String, trim: true },
    description3: { type: String },
    measure3: { type: String },
    value3: { type: Number },

    amount4: { type: String },
    serviceType4: { type: String, trim: true },
    materialType4: { type: String, trim: true },
    finish4: { type: String, trim: true },
    description4: { type: String },
    measure4: { type: String },
    value4: { type: Number },

    amount5: { type: String },
    serviceType5: { type: String, trim: true },
    materialType5: { type: String, trim: true },
    finish5: { type: String, trim: true },
    description5: { type: String },
    measure5: { type: String },
    value5: { type: Number },

    amount6: { type: String },
    serviceType6: { type: String, trim: true },
    materialType6: { type: String, trim: true },
    finish6: { type: String, trim: true },
    description6: { type: String },
    measure6: { type: String },
    value6: { type: Number },

    amount7: { type: String },
    serviceType7: { type: String, trim: true },
    materialType7: { type: String, trim: true },
    finish7: { type: String, trim: true },
    description7: { type: String },
    measure7: { type: String },
    value7: { type: Number },

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
