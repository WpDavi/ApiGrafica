const mongoose = require('mongoose');

const dbConfig = {
  url: process.env.MONGO_URL || 'mongodb://localhost:27017',
  dbName: process.env.MONGO_DB || 'grafica'
};

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String },
    category: { type: String, required: true, trim: true },
    price: { type: Number, required: true, default: 0 }
  },
  {
    timestamps: true
  }
);

const Product = mongoose.model('Product', productSchema);

async function ensureSeedData() {
  const total = await Product.countDocuments();
  if (total === 0) {
    await Product.create({
      name: 'Cartão de visitas com verniz',
      description: 'Cartão de visitas com acabamento em verniz localizado.',
      category: 'Cartão de visita',
      price: 120.0
    });
  }
}

async function initDb() {
  if (mongoose.connection.readyState === 1) return mongoose.connection;

  await mongoose.connect(dbConfig.url, { dbName: dbConfig.dbName });
  console.log(`Conectado ao MongoDB: ${dbConfig.dbName}`);
  await ensureSeedData();

  return mongoose.connection;
}

module.exports = { dbConfig, initDb, Product };
