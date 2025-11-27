const express = require('express');
const { initDb, dbConfig } = require('./db');
const productRoutes = require('./routes/products');

async function startServer() {
  await initDb();

  const app = express();
  app.use(express.json());

  app.get('/', (_req, res) => {
    res.json({ message: 'API da gráfica operante', database: dbConfig.database });
  });

  app.use('/products', productRoutes);

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
  });
}

startServer().catch((error) => {
  console.error('Erro ao iniciar o servidor', error);
  process.exit(1);
});
