const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config(); // Carrega as variáveis de ambiente

// A URL completa do PostgreSQL do Railway
const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
    console.error("A variável DATABASE_URL não foi configurada corretamente!");
    process.exit(1); // Encerra o servidor caso não haja a URL do banco de dados
}

// Criando a instância do Sequelize com a URL do PostgreSQL
const sequelize = new Sequelize(DATABASE_URL, {
    dialect: "postgres", // Definindo o tipo do banco de dados como PostgreSQL
    logging: false, // Desabilitando os logs SQL
    dialectOptions: {
        ssl: {
            require: true, // Necessário para conexão segura com PostgreSQL
            rejectUnauthorized: false, // Para permitir conexões com o certificado SSL não autorizado (necessário para Railway)
        },
    },
});

// Definindo o modelo Avaliacao
const Avaliacao = sequelize.define("Avaliacao", {
    avaliador: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    avaliacoes: {
        type: DataTypes.JSONB, // ou DataTypes.JSON
        allowNull: false,
    },
});

// Sincronizando o banco de dados
sequelize.sync()
    .then(() => console.log("Banco de dados sincronizado"))
    .catch((err) => console.log("Erro ao sincronizar banco de dados", err));

module.exports = { sequelize, Avaliacao };
