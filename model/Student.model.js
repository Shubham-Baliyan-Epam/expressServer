module.exports = (Sequelize, sequelize) => {
  const Student = sequelize.define(
    "student",
    {
      name: Sequelize.STRING,
      stream: Sequelize.STRING,
      marks: Sequelize.FLOAT,
      address: Sequelize.STRING,
      city: Sequelize.STRING,
      state: Sequelize.STRING,
      pincode: Sequelize.INTEGER,
      mobile: Sequelize.BIGINT,
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  );
  return Student;
};
