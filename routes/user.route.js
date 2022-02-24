const express = require("express");
let db = require("../model");
let router = express.Router();

router.get("/login", async (req, res) => {
  let { email, password } = req.query;
  try {
    let data = await db.User.findOne({
      where: {
        email,
      },
      raw: true,
    });
    if (data.email === email && data.password === password) {
      res.status(200).json({
        status: "success",
        message: "User successfully loggedin.",
        data: {
          email,
          name: data.name,
        },
      });
    } else throw Error();
  } catch (err) {
    console.log("error in get all route", err);
    res.status(404).json({
      status: "failed",
      message: "Wrong email or password.",
    });
  }
});
router.post("/register", async (req, res) => {
  let { name, email, password } = req.body;
  try {
    let data = await db.User.create({
      name,
      email,
      password,
    });
    res.status(201).json({
      status: "success",
      message: "User successfully registered",
      data: {
        id: data.id,
        name: data.name,
        email: data.email,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: "No User created",
    });
  }
});

module.exports = router;
