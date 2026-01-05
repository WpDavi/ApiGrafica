const express = require("express");
const path = require("path");
const cors = require("cors");
const { initDb, dbConfig } = require("./db");
const productRoutes = require("./routes/products");
const workRoutes = require("./routes/work");
const contactRoutes = require("./routes/contacts");
const localtunnel = require("localtunnel");

async function startServer() {
  await initDb();

  const app = express();
  app.use(cors());
  app.use(express.json());

  app.get("/", (_req, res) => {
    res.json({
      message: "API da gráfica operantee",
      database: dbConfig.dbName,
    });
  });

  const appStaticPath = path.join(__dirname, "public", "app");
  app.use("/app", express.static(appStaticPath));
  app.get("/app/*", (_req, res) => {
    res.sendFile(path.join(appStaticPath, "index.html"));
  });

  app.use("/products", productRoutes);
  app.use("/work", workRoutes);
  app.use("/contacts", contactRoutes);

  const port = process.env.PORT || 3000;
  const server = app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
  });

  if (process.env.ENABLE_TUNNEL !== "false") {
    startLocalTunnel(port).catch((error) => {
      console.error("Não foi possível iniciar o localtunnel", error);
    });
  }

  return server;
}

async function startLocalTunnel(port) {
  const preferredSubdomain = "grafica";
  const attempt = async (subdomain) => {
    return localtunnel({ port, subdomain });
  };

  try {
    const tunnel = await attempt(preferredSubdomain);
    logTunnelLifecycle(tunnel);
    return tunnel;
  } catch (error) {
    console.warn(
      `Falha ao iniciar o túnel com o subdomínio "${preferredSubdomain}".`,
      error?.message || error
    );

    const fallbackSubdomain = `grafica-${Date.now().toString(36)}`;

    try {
      const tunnel = await attempt(fallbackSubdomain);
      logTunnelLifecycle(tunnel);
      return tunnel;
    } catch (fallbackError) {
      console.error(
        "Não foi possível iniciar o localtunnel mesmo após tentativa de fallback.",
        fallbackError?.message || fallbackError
      );
      throw fallbackError;
    }
  }
}

function logTunnelLifecycle(tunnel) {
  console.log(`LocalTunnel ativo em ${tunnel.url}`);

  tunnel.on("close", () => {
    console.log("LocalTunnel encerrado");
  });
}

startServer().catch((error) => {
  console.error("Erro ao iniciar o servidor", error);
  process.exit(1);
});
