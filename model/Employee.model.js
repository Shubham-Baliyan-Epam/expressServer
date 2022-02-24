module.exports = (Sequelize, sequelize) => {
  const Employee = sequelize.define(
    "employee",
    {
      name: Sequelize.STRING,
      department: Sequelize.STRING,
      designation: Sequelize.STRING,
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  );
  return Employee;
};
