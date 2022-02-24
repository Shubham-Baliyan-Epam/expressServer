module.exports = (Sequelize, sequelize) => {
  const User = sequelize.define(
    "user",
    {
      name: Sequelize.STRING,
      email: {
        unique: true,
        type: Sequelize.STRING,
      },
      password: Sequelize.STRING,
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  );
  return User;
};
