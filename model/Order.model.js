const Product = require("./Product.model");

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

          // With PostgreSQL, it is optionally possible to declare when to check the foreign key constraint, passing the Deferrable type.
          // Options:
          // - `Deferrable.INITIALLY_IMMEDIATE` - Immediately check the foreign key constraints
          // - `Deferrable.INITIALLY_DEFERRED` - Defer all foreign key constraint check to the end of a transaction
          // - `Deferrable.NOT` - Don't defer the checks at all (default) - This won't allow you to dynamically change the rule in a transaction
        },
      },
      product_id: {
        type: Sequelize.INTEGER,

        references: {
          // This is a reference to another model
          model: "product",

          // This is the column name of the referenced model
          key: "id",

          // With PostgreSQL, it is optionally possible to declare when to check the foreign key constraint, passing the Deferrable type.
          // Options:
          // - `Deferrable.INITIALLY_IMMEDIATE` - Immediately check the foreign key constraints
          // - `Deferrable.INITIALLY_DEFERRED` - Defer all foreign key constraint check to the end of a transaction
          // - `Deferrable.NOT` - Don't defer the checks at all (default) - This won't allow you to dynamically change the rule in a transaction
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
