const express = require("express");
const path = require("path");
const { sequelize, Avaliacao } = require("./database"); // Importa o Sequelize e o modelo Avaliacao
const { inserirDados } = require("./inserirDados"); // Importando a função de inserção
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "public", "admin.html"))
);
app.get("/avaliador", (req, res) =>
  res.sendFile(path.join(__dirname, "public", "avaliador.html"))
);
app.get("/antiga-tela", (req, res) =>
  res.sendFile(path.join(__dirname, "public", "index.html"))
);

app.post("/avaliar", async (req, res) => {
  const { nomeAvaliador, avaliacoes } = req.body;

  if (!nomeAvaliador || !avaliacoes.length) {
    return res.status(400).json({ message: "Dados inválidos" });
  }

  const notasValidas = avaliacoes.every(
    (avaliacao) =>
      !isNaN(avaliacao.nota) && avaliacao.nota >= 0 && avaliacao.nota <= 10
  );

  if (!notasValidas) {
    return res
      .status(400)
      .json({ message: "Todas as notas devem ser números válidos entre 0 e 10." });
  }

  try {
    await Avaliacao.create({
      avaliador: nomeAvaliador,
      avaliacoes: avaliacoes,
    });
    res.status(200).json({ message: "Avaliação enviada com sucesso!" });
  } catch (err) {
    console.error("❌ Erro ao salvar avaliação:", err);
    res.status(500).json({ message: "Erro ao salvar avaliação" });
  }
});

app.get("/dados-admin", async (req, res) => {
  try {
    const avaliacoes = await Avaliacao.findAll();

    const avaliacoesFlattened = avaliacoes.flatMap((row) =>
      row.avaliacoes.map((avaliacao) => ({
        avaliador: row.avaliador,
        avaliado: avaliacao.nomeAvaliado,
        nota: parseFloat(avaliacao.nota),
      }))
    );

    const mediaNotas = {};
    avaliacoesFlattened.forEach(({ avaliado, nota }) => {
      if (!mediaNotas[avaliado]) mediaNotas[avaliado] = { total: 0, count: 0 };
      mediaNotas[avaliado].total += nota;
      mediaNotas[avaliado].count += 1;
    });

    const medias = Object.keys(mediaNotas).map((avaliado) => ({
      avaliado,
      media: mediaNotas[avaliado].total / mediaNotas[avaliado].count,
    }));

    res.status(200).json({ avaliacoes: avaliacoesFlattened, medias });
  } catch (err) {
    console.error("❌ Erro ao buscar dados:", err);
    res.status(500).json({ message: "Erro ao buscar dados" });
  }
});

app.listen(PORT, async () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);

  try {
    console.log("🔍 Tentando sincronizar o banco de dados...");
    await sequelize.sync({ force: true });
    console.log("✅ Banco de dados sincronizado com sucesso!");

    console.log("➡️ Chamando função inserirDados...");
    await inserirDados();
    console.log("✅ Dados inseridos com sucesso!");
  } catch (err) {
    console.error("❌ Erro na sincronização ou inserção de dados:", err);
  }
});
