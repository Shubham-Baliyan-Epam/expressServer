module.exports = (Sequelize, sequelize) => {
  const Insurance = sequelize.define(
    "insurance",
    {
      policyNumber: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
      policyHolderName: Sequelize.STRING,
      nominee: Sequelize.STRING,
      policyAmount: Sequelize.FLOAT,
      maturityAmount: Sequelize.FLOAT,
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  );
  return Insurance;
};
