const express = require('express');
const path = require('path');
const cors = require('cors');
const { initDb, dbConfig } = require('./db');
const productRoutes = require('./routes/products');
const workRoutes = require('./routes/work');
const contactRoutes = require('./routes/contacts');
const localtunnel = require('localtunnel');

async function startServer() {
  await initDb();

  const app = express();
  app.use(cors());
  app.use(express.json());

  app.get('/', (_req, res) => {
    res.json({ message: 'API da gráfica operante', database: dbConfig.dbName });
  });

  const appStaticPath = path.join(__dirname, 'public', 'app');
  app.use('/app', express.static(appStaticPath));
  app.get('/app/*', (_req, res) => {
    res.sendFile(path.join(appStaticPath, 'index.html'));
  });

  app.use('/products', productRoutes);
  app.use('/work', workRoutes);
  app.use('/contacts', contactRoutes);

  const port = process.env.PORT || 3000;
  const server = app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
  });

  startLocalTunnel(port).catch((error) => {
    console.error('Não foi possível iniciar o localtunnel', error);
  });

  return server;
}

async function startLocalTunnel(port) {
  const subdomain = process.env.TUNNEL_SUBDOMAIN || 'grafica';
  const tunnel = await localtunnel({ port, subdomain });

  console.log(`LocalTunnel ativo em ${tunnel.url}`);

  tunnel.on('close', () => {
    console.log('LocalTunnel encerrado');
  });

  return tunnel;
}

startServer().catch((error) => {
  console.error('Erro ao iniciar o servidor', error);
  process.exit(1);
});
