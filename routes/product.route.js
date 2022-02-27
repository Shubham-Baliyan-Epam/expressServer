const express = require("express");
let router = express.Router();
let db = require("../model");
const filter = require("../utils/filter");

router.get("/", async (req, res) => {
  try {
    let filters = filter(req.query);
    let data = await db.Product.findAll(filters);
    res.status(200).json({
      status: "success",
      message: "All Products",
      data,
    });
  } catch (err) {
    console.log("error in get all route", err);
    res.status(404).json({
      status: "failed",
      message: "No Product found .",
      data: [],
    });
  }
});
router.post("/", async (req, res) => {
  console.log(req.body);
  let body = req.body;
  try {
    let data = await db.Product.create({
      ...body,
    });
    res.status(201).json({
      status: "success",
      message: "Product created",
      data,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "failed",
      message: "No Product created",
    });
  }
});
router.put("/:id", async (req, res) => {
  let id = req.params.id;
  try {
    let data = await db.Product.update(
      {
        ...req.body,
      },
      {
        where: {
          id,
        },
      }
    );
    res.status(201).json({
      status: "success",
      message: " Product updated successfully .",
      data,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: "No Product found .",
    });
  }
});
router.delete("/:id", async (req, res) => {
  let id = req.params.id;
  try {
    await db.Product.destroy({
      where: {
        id,
      },
    });
    res.status(200).json({
      status: "success",
      message: "Product deleted",
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: "Product cannot be deleted",
    });
  }
});
router.get("/:id", async (req, res) => {
  let id = req.params.id;
  console.log(id, "id");
  try {
    let data = await db.Product.findByPk(id, { raw: true });
    res.status(200).json({
      status: "success",
      message: "Product found",
      data,
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: "No Product found .",
    });
  }
});
module.exports = router;
