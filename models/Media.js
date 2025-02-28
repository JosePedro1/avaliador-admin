const { DataTypes } = require("sequelize");
const { sequelize } = require("../database");

const MediaFinal = sequelize.define("MediaFinal", {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nota: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

const MediaEntrevista = sequelize.define("MediaEntrevista", {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nota: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

const MediaHistorico = sequelize.define("MediaHistorico", {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nota: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

const CartaIntencao = sequelize.define("CartaIntencao", {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nota: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

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

module.exports = {
  MediaFinal,
  MediaEntrevista,
  MediaHistorico,
  CartaIntencao,
  NotasAvaliadores,
};
