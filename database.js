const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config(); // Carrega as variáveis de ambiente

// A URL completa do PostgreSQL do Railway
const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error("❌ A variável DATABASE_URL não foi configurada corretamente!");
  process.exit(1); // Encerra o servidor caso não haja a URL do banco de dados
}

// Instância do Sequelize
const sequelize = new Sequelize(DATABASE_URL, {
  dialect: "postgres",
  logging: false, // Não exibir logs SQL no console
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Permite conexões com certificados SSL auto-assinados (Railway)
    },
  },
});

// Modelo NotasAvaliadores
const NotasAvaliadores = sequelize.define("NotasAvaliadores", {
  avaliador: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  avaliado: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nota: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

// Modelo Carta de Intenção
const CartaIntencaos = sequelize.define("CartaIntencaos", {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nota: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

// Modelo Média Entrevista
const MediaEntrevista = sequelize.define("MediaEntrevista", {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  media: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

// Modelo Média Histórico
const MediaHistoricos = sequelize.define("MediaHistoricos", {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  media: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

// Modelo Média Final
const MediaFinals = sequelize.define("MediaFinals", {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  media: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

// Sincronizando todos os modelos com o banco de dados
sequelize
  .sync()
  .then(() => console.log("🔥 Banco de dados sincronizado com sucesso!"))
  .catch((err) =>
    console.error("❌ Erro ao sincronizar o banco de dados:", err)
  );

module.exports = {
  sequelize,
  NotasAvaliadores,
  CartaIntencaos,
  MediaEntrevista,
  MediaHistoricos,
  MediaFinals,
};
