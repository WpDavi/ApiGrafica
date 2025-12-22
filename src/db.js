const mongoose = require("mongoose");

const dbConfig = {
  url:
    process.env.MONGO_URL ||
    "mongodb+srv://wpdavi:bleknit007@utam.kztzo.mongodb.net/?retryWrites=true&w=majority&appName=UTAM",
  dbName: process.env.MONGO_DB || "grafica",
};

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String },
    category: { type: String, required: true, trim: true },
    price: { type: Number, required: true, default: 0 },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

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

const Work = mongoose.model("Work", workSchema);

async function ensureSeedData() {
  const total = await Product.countDocuments();
  if (total === 0) {
    await Product.create({
      name: "Cartão de visitas com verniz",
      description: "Cartão de visitas com acabamento em verniz localizado.",
      category: "Cartão de visita",
      price: 120.0,
    });
  }
}

async function initDb() {
  if (mongoose.connection.readyState === 1) return mongoose.connection;

  try {
    await mongoose.connect(dbConfig.url, { dbName: dbConfig.dbName });
  } catch (error) {
    const message = [
      "Falha ao conectar no MongoDB.",
      `URL: ${dbConfig.url}`,
      `Banco: ${dbConfig.dbName}`,
      "Verifique se o serviço do MongoDB está ativo ou defina MONGO_URL.",
    ].join(" ");
    error.message = `${message}\n${error.message}`;
    throw error;
  }
  console.log(`Conectado ao MongoDB: ${dbConfig.dbName}`);
  await ensureSeedData();

  return mongoose.connection;
}

module.exports = { dbConfig, initDb, Product, Work };
