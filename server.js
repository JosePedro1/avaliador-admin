const express = require("express");
const cors = require("cors");
const path = require("path");
const {
  sequelize,
  CartaIntencaos,
  MediaEntrevista,
  MediaHistoricos,
  MediaFinals,
  NotasAvaliadores,
} = require("./database");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

if (!ADMIN_PASSWORD) {
  console.error("A variável ADMIN_PASSWORD não foi configurada corretamente!");
}

app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "public", "admin.html")));

app.post("/avaliar", async (req, res) => {
  const { nomeAvaliador, avaliacoes } = req.body;

  if (!nomeAvaliador || avaliacoes.length === 0) {
    return res.status(400).json({ message: "Dados inválidos" });
  }

  try {
    await NotasAvaliadores.bulkCreate(
      avaliacoes.map(avaliacao => ({
        avaliador: nomeAvaliador,
        nomeAvaliado: avaliacao.nomeAvaliado,
        nota: avaliacao.nota
      }))
    );

    res.status(200).json({ message: "Avaliação enviada com sucesso!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao salvar avaliação" });
  }
});

app.get("/dados-admin", async (req, res) => {
  try {
    const cartaIntencao = await CartaIntencaos.findAll();
    const mediasEntrevista = await MediaEntrevista.findAll();
    const mediasHistorico = await MediaHistoricos.findAll();
    const mediasFinal = await MediaFinals.findAll();
    const avaliacoes = await NotasAvaliadores.findAll();

    res.status(200).json({
      cartaIntencao,
      mediasEntrevista,
      mediasHistorico,
      mediasFinal,
      avaliacoes,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao buscar dados" });
  }
});

app.post("/admin-login", (req, res) => {
  const { senha } = req.body;
  if (senha === ADMIN_PASSWORD) {
    res.status(200).json({ autorizado: true });
  } else {
    res.status(403).json({ autorizado: false, message: "Senha incorreta!" });
  }
});

sequelize.sync()
  .then(() => console.log("🔥 Banco de dados sincronizado!"))
  .catch((err) => console.error("Erro ao sincronizar banco de dados", err));

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
