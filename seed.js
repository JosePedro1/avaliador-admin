const { sequelize } = require("./database");
const {
  NotasAvaliadores,
  MediaFinal,
  CartaIntencao,
  MediaHistorico,
  MediaEntrevista,
} = require("./models/Media");

async function inserirDados() {
  await sequelize.sync({ force: true });

  const mediasFinal = [
    { nomeAvaliado: "Mikaely", nota: 5.49 },
    { nomeAvaliado: "Ana Paula", nota: 8.88 },
    { nomeAvaliado: "Erick", nota: 8.06 },
    { nomeAvaliado: "Antônio", nota: 8.11 },
    { nomeAvaliado: "Bruna Verena", nota: 8.45 },
    { nomeAvaliado: "Vitória", nota: 8.58 },
    { nomeAvaliado: "Anna Karolyne", nota: 7.23 },
    { nomeAvaliado: "Marina", nota: 6.66 },
    { nomeAvaliado: "Antônio Carlos", nota: 8.16 },
    { nomeAvaliado: "Helen", nota: 9.35 },
    { nomeAvaliado: "Keila", nota: 7.62 },
    { nomeAvaliado: "Maria Rita", nota: 6.75 },
    { nomeAvaliado: "Daysa", nota: 6.74 },
    { nomeAvaliado: "Eduarda", nota: 9.48 },
  ];

  const cartaIntencao = [
    { nomeAvaliado: "Mikaely", nota: 3 },
    { nomeAvaliado: "Ana Paula", nota: 10 },
    { nomeAvaliado: "Erick", nota: 7 },
    { nomeAvaliado: "Antônio", nota: 7.5 },
    { nomeAvaliado: "Bruna Verena", nota: 8.8 },
    { nomeAvaliado: "Vitória", nota: 7.5 },
    { nomeAvaliado: "Anna Karolyne", nota: 7.8 },
    { nomeAvaliado: "Marina", nota: 7 },
    { nomeAvaliado: "Antônio Carlos", nota: 8.5 },
    { nomeAvaliado: "Helen", nota: 10 },
    { nomeAvaliado: "Keila", nota: 6.8 },
    { nomeAvaliado: "Maria Rita", nota: 6 },
    { nomeAvaliado: "Daysa", nota: 5.5 },
    { nomeAvaliado: "Eduarda", nota: 10 },
  ];

  const mediaHistorico = [
    { nomeAvaliado: "Mikaely", nota: 7.68 },
    { nomeAvaliado: "Ana Paula", nota: 7.15 },
    { nomeAvaliado: "Erick", nota: 8.01 },
    { nomeAvaliado: "Antônio", nota: 7.75 },
    { nomeAvaliado: "Bruna Verena", nota: 7.48 },
    { nomeAvaliado: "Vitória", nota: 8.96 },
    { nomeAvaliado: "Anna Karolyne", nota: 8.48 },
    { nomeAvaliado: "Marina", nota: 6.86 },
    { nomeAvaliado: "Antônio Carlos", nota: 7.98 },
    { nomeAvaliado: "Helen", nota: 9.16 },
    { nomeAvaliado: "Keila", nota: 7.2 },
    { nomeAvaliado: "Maria Rita", nota: 8.02 },
    { nomeAvaliado: "Daysa", nota: 8.52 },
    { nomeAvaliado: "Eduarda", nota: 9.31 },
  ];

  const mediaEntrevista = [
    { nomeAvaliado: "Mikaely", nota: 5.78 },
    { nomeAvaliado: "Ana Paula", nota: 9.48 },
    { nomeAvaliado: "Erick", nota: 9.17 },
    { nomeAvaliado: "Antônio", nota: 9.08 },
    { nomeAvaliado: "Bruna Verena", nota: 9.08 },
    { nomeAvaliado: "Vitória", nota: 9.28 },
    { nomeAvaliado: "Anna Karolyne", nota: 5.4 },
    { nomeAvaliado: "Marina", nota: 6.13 },
    { nomeAvaliado: "Antônio Carlos", nota: 8 },
    { nomeAvaliado: "Helen", nota: 8.9 },
    { nomeAvaliado: "Keila", nota: 8.87 },
    { nomeAvaliado: "Maria Rita", nota: 6.22 },
    { nomeAvaliado: "Daysa", nota: 6.2 },
    { nomeAvaliado: "Eduarda", nota: 9.12 },
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

inserirDados();
