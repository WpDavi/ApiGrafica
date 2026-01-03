const mongoose = require("mongoose");
const Product = require("./models/Product");
const Work = require("./models/Work");
const Contact = require("./models/Contact");

const dbConfig = {
  url:
    process.env.MONGO_URL ||
    "mongodb+srv://wpdavi:bleknit007@utam.kztzo.mongodb.net/?retryWrites=true&w=majority&appName=UTAM",
  dbName: process.env.MONGO_DB || "grafica",
};

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

module.exports = { dbConfig, initDb, Product, Work, Contact };
