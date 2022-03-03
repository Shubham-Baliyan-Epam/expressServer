const express = require("express");
let router = express.Router();
let db = require("../model");
const Product = require("../model/Product.model");
const User = require("../model/User.model");
const filter = require("../utils/filter");

router.get("/", async (req, res) => {
  try {
    // let filters = filter(req.query);
    let data = await db.Order.findAll({ raw: true });
    res.status(200).json({
      status: "success",
      message: "All Orders",
      data,
    });
  } catch (err) {
    console.log("error in get all route", err);
    res.status(404).json({
      status: "failed",
      message: "No Order found .",
      data: [],
    });
  }
});
router.get("/user/:id", async (req, res) => {
  try {
    let { id } = req.params;
    // let filters = filter(req.query);
    let data = await db.sequelize.query(
      `SELECT sale_price,user_id, address1,address2,brand,name,category,img,public.order.id,order_date FROM public.order, public.product
    WHERE  product_id= public.product.id  and user_id=${id}`,
      { type: db.sequelize.QueryTypes.SELECT }
    );
    res.status(200).json({
      status: "success",
      message: "All Orders",
      data,
    });
  } catch (err) {
    console.log("error in get all route", err);
    res.status(404).json({
      status: "failed",
      message: "No Order found .",
      data: [],
    });
  }
});
router.post("/", async (req, res) => {
  console.log(req.body);
  let body = req.body;
  try {
    let data = await db.Order.create({
      ...body,
    });
    res.status(201).json({
      status: "success",
      message: "Order created",
      data,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "failed",
      message: "No Order created",
    });
  }
});
// router.put("/:id", async (req, res) => {
//   let id = req.params.id;
//   try {
//     let data = await db.Product.update(
//       {
//         ...req.body,
//       },
//       {
//         where: {
//           id,
//         },
//       }
//     );
//     res.status(201).json({
//       status: "success",
//       message: " Product updated successfully .",
//       data,
//     });
//   } catch (err) {
//     res.status(400).json({
//       status: "failed",
//       message: "No Product found .",
//     });
//   }
// });
// router.delete("/:id", async (req, res) => {
//   let id = req.params.id;
//   try {
//     await db.Product.destroy({
//       where: {
//         id,
//       },
//     });
//     res.status(200).json({
//       status: "success",
//       message: "Product deleted",
//     });
//   } catch (err) {
//     res.status(400).json({
//       status: "failed",
//       message: "Product cannot be deleted",
//     });
//   }
// });
router.get("/:id", async (req, res) => {
  let id = req.params.id;
  console.log(id, "id");
  try {
    let data = await db.Order.findByPk(id, {
      raw: true,
      include: [
        {
          model: User,
          attributes: ["name", "email"],
        },
      ],
    });
    res.status(200).json({
      status: "success",
      message: "Order found",
      data,
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: "No Order found .",
    });
  }
});
module.exports = router;
