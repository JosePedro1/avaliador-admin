const { sequelize } = require("./database");
const {
  NotasAvaliadores,
  MediaFinal,
  CartaIntencao,
  MediaHistorico,
  MediaEntrevista,
} = require("./models/Media");

async function inserirDados() {
  await sequelize.sync({});

  const mediasFinal = [
    { nome: "Mikaely", nota: 5.49 },
    { nome: "Ana Paula", nota: 8.88 },
    { nome: "Erick", nota: 8.06 },
    { nome: "Antônio", nota: 8.11 },
    { nome: "Bruna Verena", nota: 8.45 },
    { nome: "Vitória", nota: 8.58 },
    { nome: "Anna Karolyne", nota: 7.23 },
    { nome: "Marina", nota: 6.66 },
    { nome: "Antônio Carlos", nota: 8.16 },
    { nome: "Helen", nota: 9.35 },
    { nome: "Keila", nota: 7.62 },
    { nome: "Maria Rita", nota: 6.75 },
    { nome: "Daysa", nota: 6.74 },
    { nome: "Eduarda", nota: 9.48 },
  ];

  const cartaIntencao = [
    { nome: "Mikaely", nota: 3 },
    { nome: "Ana Paula", nota: 10 },
    { nome: "Erick", nota: 7 },
    { nome: "Antônio", nota: 7.5 },
    { nome: "Bruna Verena", nota: 8.8 },
    { nome: "Vitória", nota: 7.5 },
    { nome: "Anna Karolyne", nota: 7.8 },
    { nome: "Marina", nota: 7 },
    { nome: "Antônio Carlos", nota: 8.5 },
    { nome: "Helen", nota: 10 },
    { nome: "Keila", nota: 6.8 },
    { nome: "Maria Rita", nota: 6 },
    { nome: "Daysa", nota: 5.5 },
    { nome: "Eduarda", nota: 10 },
  ];

  const mediaHistorico = [
    { nome: "Mikaely", nota: 7.68 },
    { nome: "Ana Paula", nota: 7.15 },
    { nome: "Erick", nota: 8.01 },
    { nome: "Antônio", nota: 7.75 },
    { nome: "Bruna Verena", nota: 7.48 },
    { nome: "Vitória", nota: 8.96 },
    { nome: "Anna Karolyne", nota: 8.48 },
    { nome: "Marina", nota: 6.86 },
    { nome: "Antônio Carlos", nota: 7.98 },
    { nome: "Helen", nota: 9.16 },
    { nome: "Keila", nota: 7.2 },
    { nome: "Maria Rita", nota: 8.02 },
    { nome: "Daysa", nota: 8.52 },
    { nome: "Eduarda", nota: 9.31 },
  ];

  const mediaEntrevista = [
    { nome: "Mikaely", nota: 5.78 },
    { nome: "Ana Paula", nota: 9.48 },
    { nome: "Erick", nota: 9.17 },
    { nome: "Antônio", nota: 9.08 },
    { nome: "Bruna Verena", nota: 9.08 },
    { nome: "Vitória", nota: 9.28 },
    { nome: "Anna Karolyne", nota: 5.4 },
    { nome: "Marina", nota: 6.13 },
    { nome: "Antônio Carlos", nota: 8 },
    { nome: "Helen", nota: 8.9 },
    { nome: "Keila", nota: 8.87 },
    { nome: "Maria Rita", nota: 6.22 },
    { nome: "Daysa", nota: 6.2 },
    { nome: "Eduarda", nota: 9.12 },
  ];
  const NotasAvaliadores = [
    // JACOB
    { avaliador: "JACOB", avaliado: "Mikaely", nota: 4.1 },
    { avaliador: "JACOB", avaliado: "Ana Paula", nota: 8.4 },
    { avaliador: "JACOB", avaliado: "Erick", nota: 8.5 },
    { avaliador: "JACOB", avaliado: "Antônio", nota: 8.5 },
    { avaliador: "JACOB", avaliado: "Bruna Verena", nota: 7.9 },
    { avaliador: "JACOB", avaliado: "Vitória", nota: 8.4 },
    { avaliador: "JACOB", avaliado: "Anna Karolyne", nota: 6.4 },
    { avaliador: "JACOB", avaliado: "Marina", nota: 6.2 },
    { avaliador: "JACOB", avaliado: "Antônio Carlos", nota: 7.3 },
    { avaliador: "JACOB", avaliado: "Helen", nota: 7.9 },
    { avaliador: "JACOB", avaliado: "Keila", nota: 8.2 },
    { avaliador: "JACOB", avaliado: "Maria Rita", nota: 7 },
    { avaliador: "JACOB", avaliado: "Daysa", nota: 6 },
    { avaliador: "JACOB", avaliado: "Eduarda", nota: 8.3 },
  
    // Ana Victoria
    { avaliador: "Ana Victoria", avaliado: "Mikaely", nota: 5.8 },
    { avaliador: "Ana Victoria", avaliado: "Ana Paula", nota: 10 },
    { avaliador: "Ana Victoria", avaliado: "Erick", nota: 9.5 },
    { avaliador: "Ana Victoria", avaliado: "Antônio", nota: 9 },
    { avaliador: "Ana Victoria", avaliado: "Bruna Verena", nota: 8.9 },
    { avaliador: "Ana Victoria", avaliado: "Vitória", nota: 9.3 },
    { avaliador: "Ana Victoria", avaliado: "Anna Karolyne", nota: 6 },
    { avaliador: "Ana Victoria", avaliado: "Marina", nota: 7.1 },
    { avaliador: "Ana Victoria", avaliado: "Antônio Carlos", nota: 8 },
    { avaliador: "Ana Victoria", avaliado: "Helen", nota: 8.5 },
    { avaliador: "Ana Victoria", avaliado: "Keila", nota: 9.8 },
    { avaliador: "Ana Victoria", avaliado: "Maria Rita", nota: 5.8 },
    { avaliador: "Ana Victoria", avaliado: "Daysa", nota: 6.7 },
    { avaliador: "Ana Victoria", avaliado: "Eduarda", nota: 9.6 },
  
    // Renata
    { avaliador: "Renata", avaliado: "Mikaely", nota: 8 },
    { avaliador: "Renata", avaliado: "Ana Paula", nota: 9 },
    { avaliador: "Renata", avaliado: "Erick", nota: 8 },
    { avaliador: "Renata", avaliado: "Antônio", nota: 8 },
    { avaliador: "Renata", avaliado: "Bruna Verena", nota: 8.5 },
    { avaliador: "Renata", avaliado: "Vitória", nota: 8.5 },
    { avaliador: "Renata", avaliado: "Anna Karolyne", nota: 6 },
    { avaliador: "Renata", avaliado: "Marina", nota: 7 },
    { avaliador: "Renata", avaliado: "Antônio Carlos", nota: 8 },
    { avaliador: "Renata", avaliado: "Helen", nota: 8 },
    { avaliador: "Renata", avaliado: "Keila", nota: 7 },
    { avaliador: "Renata", avaliado: "Maria Rita", nota: 6 },
    { avaliador: "Renata", avaliado: "Daysa", nota: 6 },
    { avaliador: "Renata", avaliado: "Eduarda", nota: 8 },
  
    // Kaylane
    { avaliador: "Kaylane", avaliado: "Mikaely", nota: 5 },
    { avaliador: "Kaylane", avaliado: "Ana Paula", nota: 9.5 },
    { avaliador: "Kaylane", avaliado: "Erick", nota: 9.5 },
    { avaliador: "Kaylane", avaliado: "Antônio", nota: 9 },
    { avaliador: "Kaylane", avaliado: "Bruna Verena", nota: 9.5 },
    { avaliador: "Kaylane", avaliado: "Vitória", nota: 9.5 },
    { avaliador: "Kaylane", avaliado: "Anna Karolyne", nota: 5 },
    { avaliador: "Kaylane", avaliado: "Marina", nota: 6 },
    { avaliador: "Kaylane", avaliado: "Antônio Carlos", nota: 8 },
    { avaliador: "Kaylane", avaliado: "Helen", nota: 9.5 },
    { avaliador: "Kaylane", avaliado: "Keila", nota: 9.5 },
    { avaliador: "Kaylane", avaliado: "Maria Rita", nota: 7 },
    { avaliador: "Kaylane", avaliado: "Daysa", nota: 6 },
    { avaliador: "Kaylane", avaliado: "Eduarda", nota: 9 },
  
    // Amanda Barbosa
    { avaliador: "Amanda Barbosa", avaliado: "Ana Paula", nota: 10 },
    { avaliador: "Amanda Barbosa", avaliado: "Erick", nota: 10 },
    { avaliador: "Amanda Barbosa", avaliado: "Antônio", nota: 10 },
    { avaliador: "Amanda Barbosa", avaliado: "Bruna Verena", nota: 10 },
    { avaliador: "Amanda Barbosa", avaliado: "Vitória", nota: 10 },
    { avaliador: "Amanda Barbosa", avaliado: "Anna Karolyne", nota: 2 },
    { avaliador: "Amanda Barbosa", avaliado: "Marina", nota: 4.5 },
    { avaliador: "Amanda Barbosa", avaliado: "Antônio Carlos", nota: 8.5 },
    { avaliador: "Amanda Barbosa", avaliado: "Helen", nota: 9.5 },
    { avaliador: "Amanda Barbosa", avaliado: "Keila", nota: 9 },
    { avaliador: "Amanda Barbosa", avaliado: "Maria Rita", nota: 5.5 },
    { avaliador: "Amanda Barbosa", avaliado: "Daysa", nota: 6 },
    { avaliador: "Amanda Barbosa", avaliado: "Eduarda", nota: 10 },
  
    // Luzielly
    { avaliador: "Luzielly", avaliado: "Mikaely", nota: 6 },
    { avaliador: "Luzielly", avaliado: "Ana Paula", nota: 10 },
    { avaliador: "Luzielly", avaliado: "Erick", nota: 9.5 },
    { avaliador: "Luzielly", avaliado: "Antônio", nota: 10 },
    { avaliador: "Luzielly", avaliado: "Bruna Verena", nota: 9.7 },
    { avaliador: "Luzielly", avaliado: "Vitória", nota: 10 },
    { avaliador: "Luzielly", avaliado: "Anna Karolyne", nota: 7 },
    { avaliador: "Luzielly", avaliado: "Marina", nota: 6 },
    { avaliador: "Luzielly", avaliado: "Antônio Carlos", nota: 8.2 },
    { avaliador: "Luzielly", avaliado: "Helen", nota: 10 },
    { avaliador: "Luzielly", avaliado: "Keila", nota: 9.7 },
    { avaliador: "Luzielly", avaliado: "Maria Rita", nota: 6 },
    { avaliador: "Luzielly", avaliado: "Daysa", nota: 6.5 },
    { avaliador: "Luzielly", avaliado: "Eduarda", nota: 9.8 },
  ];

  await MediaFinal.bulkCreate(mediasFinal);
  await CartaIntencao.bulkCreate(cartaIntencao);
  await MediaHistorico.bulkCreate(mediaHistorico);
  await MediaEntrevista.bulkCreate(mediaEntrevista);
  await NotasAvaliadores.bulkCreate(NotasAvaliadores)
  console.log("✅ Dados inseridos com sucesso!");
  process.exit();
}

module.exports = {inserirDados};
