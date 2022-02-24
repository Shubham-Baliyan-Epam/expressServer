const express = require("express");
let db = require("../model");
let router = express.Router();

router.get("/", async (req, res) => {
  try {
    let data = await db.Insurance.findAll({ raw: true });
    res.status(200).json({
      status: "success",
      data,
    });
  } catch (err) {
    console.log("error in get all route", err);
    res.status(404).json({
      status: "failed",
      message: "No Insurance found .",
    });
  }
});
router.post("/", async (req, res) => {
  let { policyHolderName, policyAmount, maturityAmount, nominee } = req.body;
  try {
    let data = await db.Insurance.create({
      policyHolderName,
      policyAmount,
      maturityAmount,
      nominee,
    });
    res.status(201).json({
      status: "success",
      message: "Insurance created",
      data,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: "No Insurance created",
    });
  }
});
router.put("/:id", async (req, res) => {
  let id = req.params.id;
  try {
    let data = await db.Insurance.update(
      {
        policyHolderName: req.body.policyHolderName,
        policyAmount: req.body.policyAmount,
        maturityAmount: req.body.maturityAmount,
        nominee: req.body.nominee,
      },
      {
        where: {
          policyNumber: id,
        },
      }
    );
    res.status(201).json({
      status: "success",
      message: " Insurance updated successfully .",
      data,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: "No Insurance found .",
    });
  }
});
router.delete("/:id", async (req, res) => {
  let id = req.params.id;
  try {
    await db.Insurance.destroy({
      where: {
        policyNumber: id,
      },
    });
    res.status(200).json({
      status: "success",
      message: "Insurance deleted",
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: "Insurance cannot be deleted",
    });
  }
});
router.get("/:id", async (req, res) => {
  let id = req.params.id;
  console.log(id, "id");
  try {
    let data = await db.Insurance.findByPk(id, { raw: true });
    res.status(200).json({
      status: "success",
      message: "Insurance found",
      data,
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: "No Insurance found .",
    });
  }
});
module.exports = router;
