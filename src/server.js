const express = require('express');
const cors = require('cors');
const { initDb, dbConfig } = require('./db');
const productRoutes = require('./routes/products');
const workRoutes = require('./routes/work');

async function startServer() {
  await initDb();

  const app = express();
  app.use(cors());
  app.use(express.json());

  app.get('/', (_req, res) => {
    res.json({ message: 'API da gráfica operante', database: dbConfig.dbName });
  });

  app.use('/products', productRoutes);
  app.use('/work', workRoutes);

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
  });
}

startServer().catch((error) => {
  console.error('Erro ao iniciar o servidor', error);
  process.exit(1);
});
