module.exports = (Sequelize, sequelize) => {
  const Product = sequelize.define(
    "product",
    {
      name: Sequelize.STRING,
      description: Sequelize.STRING,
      price: Sequelize.INTEGER,
      category: Sequelize.STRING,
      rating: Sequelize.INTEGER,
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  );
  return Product;
};
