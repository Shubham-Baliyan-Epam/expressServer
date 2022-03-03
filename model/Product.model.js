module.exports = (Sequelize, sequelize) => {
  const Product = sequelize.define(
    "product",
    {
      name: Sequelize.STRING,
      category: Sequelize.STRING,
      price: Sequelize.INTEGER,
      brand: Sequelize.STRING,
      rating: Sequelize.INTEGER,
      stock: Sequelize.INTEGER,
      img: Sequelize.STRING,
      description: Sequelize.STRING,
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  );

  return Product;
};
