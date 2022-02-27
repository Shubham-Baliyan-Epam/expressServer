const express = require("express");
let router = express.Router();
let db = require("../model");
const filter = require("../utils/filter");

router.get("/", async (req, res) => {
  try {
    let filters = filter(req.query);
    let data = await db.Student.findAll(filters);
    res.status(200).json({
      status: "success",
      message: "All students",
      data,
    });
  } catch (err) {
    console.log("error in get all route", err);
    res.status(404).json({
      status: "failed",
      message: "No Student found .",
      data: [],
    });
  }
});
router.post("/", async (req, res) => {
  console.log(req.body);
  let body = req.body;
  try {
    let data = await db.Student.create({
      ...body,
    });
    res.status(201).json({
      status: "success",
      message: "Student created",
      data,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "failed",
      message: "No Student created",
    });
  }
});
router.put("/:id", async (req, res) => {
  let id = req.params.id;
  try {
    let data = await db.Student.update(
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
      message: " Student updated successfully .",
      data,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: "No Student found .",
    });
  }
});
router.delete("/:id", async (req, res) => {
  let id = req.params.id;
  try {
    await db.Student.destroy({
      where: {
        id,
      },
    });
    res.status(200).json({
      status: "success",
      message: "Student deleted",
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: "Student cannot be deleted",
    });
  }
});
router.get("/:id", async (req, res) => {
  let id = req.params.id;
  console.log(id, "id");
  try {
    let data = await db.Student.findByPk(id, { raw: true });
    res.status(200).json({
      status: "success",
      message: "Student found",
      data,
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: "No Student found .",
    });
  }
});
module.exports = router;
