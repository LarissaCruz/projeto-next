const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("./src/mock/db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.post("/login", (req, res) => {
  const { username, password } = req.body;

  const usuarioExistente = router.db
    .get("usuarios")
    .find({ username, password })
    .value();

  if (usuarioExistente) {
    return res.json(usuarioExistente);
  } else {
    return res.status(404).json({ error: "Usuário não encontrado" });
  }
});

server.use(router);

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`JSON Server está rodando na porta ${PORT}`);
});
