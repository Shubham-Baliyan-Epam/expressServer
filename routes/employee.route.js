const express = require("express");
let router = express.Router();
let db = require("../model");

router.get("/", async (req, res) => {
  try {
    let data = await db.Employee.findAll({ raw: true });
    res.status(200).json({
      status: "success",
      data,
    });
  } catch (err) {
    console.log("error in get all route", err);
    res.status(404).json({
      status: "failed",
      message: "No Employee found .",
    });
  }
});
router.post("/", async (req, res) => {
  let { name, department, designation } = req.body;
  try {
    let data = await db.Employee.create({
      name,
      department,
      designation,
    });
    res.status(201).json({
      status: "success",
      message: "Employee created",
      data,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: "No Employee created",
    });
  }
});
router.put("/:id", async (req, res) => {
  let id = req.params.id;
  try {
    let data = await db.Employee.update(
      {
        name: req.body.name,
        department: req.body.department,
        designation: req.body.designation,
      },
      {
        where: {
          id,
        },
      }
    );
    res.status(201).json({
      status: "success",
      message: " Employee updated successfully .",
      data,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: "No Employee found .",
    });
  }
});
router.delete("/:id", async (req, res) => {
  let id = req.params.id;
  try {
    await db.Employee.destroy({
      where: {
        id,
      },
    });
    res.status(200).json({
      status: "success",
      message: "Employee deleted",
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: "Employee cannot be deleted",
    });
  }
});
router.get("/:id", async (req, res) => {
  let id = req.params.id;
  console.log(id, "id");
  try {
    let data = await db.Employee.findByPk(id, { raw: true });
    res.status(201).json({
      status: "success",
      message: "Employee found",
      data,
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: "No Employee found .",
    });
  }
});
module.exports = router;
