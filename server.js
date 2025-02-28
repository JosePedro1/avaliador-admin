const express = require("express");
const path = require("path");
const { sequelize, Avaliacao } = require("./database"); // Importa o Sequelize e o modelo Avaliacao
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 3000;

// const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
// if (!ADMIN_PASSWORD) {
//     console.error("A variável DATABASE_senha não foi configurada corretamente!");
// }
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "public", "admin.html")));
app.get("/avaliador", (req, res) => res.sendFile(path.join(__dirname, "public", "avaliador.html")));
app.get("/antiga-tela", (req, res) => res.sendFile(path.join(__dirname, "public", "index.html")));

app.post("/avaliar", async (req, res) => {
    const { nomeAvaliador, avaliacoes } = req.body;

    if (!nomeAvaliador || !avaliacoes.length) {
        return res.status(400).json({ message: "Dados inválidos" });
    }

    // Verifica se todas as notas são válidas e são números decimais
    const notasValidas = avaliacoes.every(avaliacao => {
        return !isNaN(avaliacao.nota) && avaliacao.nota >= 0 && avaliacao.nota <= 10;
    });

    if (!notasValidas) {
        return res.status(400).json({ message: "Todas as notas devem ser números válidos entre 0 e 10." });
    }

    try {
        // Usando o modelo Sequelize para criar a avaliação
        await Avaliacao.create({
            avaliador: nomeAvaliador,
            avaliacoes: avaliacoes
        });
        res.status(200).json({ message: "Avaliação enviada com sucesso!" });
    } catch (err) {
        res.status(500).json({ message: "Erro ao salvar avaliação" });
    }
});

app.get("/dados-admin", async (req, res) => {
    try {
        // Buscando todas as avaliações no banco de dados
        const avaliacoes = await Avaliacao.findAll();

        // Flattening das avaliações
        const avaliacoesFlattened = avaliacoes.flatMap(row => {
            return row.avaliacoes.map(avaliacao => ({
                avaliador: row.avaliador,
                avaliado: avaliacao.nomeAvaliado,
                nota: parseFloat(avaliacao.nota) // Garantindo que a nota seja um número decimal
            }));
        });

        // Calculando a média das notas para cada avaliado
        const mediaNotas = {};
        avaliacoesFlattened.forEach(({ avaliado, nota }) => {
            if (!mediaNotas[avaliado]) mediaNotas[avaliado] = { total: 0, count: 0 };
            mediaNotas[avaliado].total += nota;
            mediaNotas[avaliado].count += 1;
        });

        const medias = Object.keys(mediaNotas).map(avaliado => ({
            avaliado,
            media: mediaNotas[avaliado].total / mediaNotas[avaliado].count
        }));

        res.status(200).json({ avaliacoes: avaliacoesFlattened, medias });
    } catch (err) {
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

app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
