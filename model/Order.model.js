module.exports = (Sequelize, sequelize) => {
  const Order = sequelize.define(
    "order",
    {
      sale_price: Sequelize.INTEGER,
      address1: Sequelize.STRING,
      order_date: Sequelize.DATE,
      address2: Sequelize.STRING,
      user_id: {
        type: Sequelize.INTEGER,

        references: {
          // This is a reference to another model
          model: "user",

          // This is the column name of the referenced model
          key: "id",
        },
      },
      product_id: {
        type: Sequelize.INTEGER,

        references: {
          // This is a reference to another model
          model: "product",

          // This is the column name of the referenced model
          key: "id",
        },
      },
    },
    {
      freezeTableName: true,
    }
  );
  // Product.belongsToMany(Order);

  return Order;
};
