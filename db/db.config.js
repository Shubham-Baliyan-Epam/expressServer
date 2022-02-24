module.exports = {
  HOST: "localhost",
  USER: "postgres", //root for mysql ,postgres
  PASSWORD: "admin12345",
  DB: "test",
  dialect: "postgres", //mysql // postgres
  pool: {
    min: 0,
    max: 5,
    acquire: 30000,
    idle: 10000,
  },
};
