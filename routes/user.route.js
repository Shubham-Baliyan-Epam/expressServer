const express = require("express");
let db = require("../model");
let router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
//routes for users ,login,registration

router.put("/user/:id", async (req, res) => {
  let id = req.params.id;
  try {
    let data = await db.User.update(
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
      message: " User updated successfully .",
      data,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: "No User found .",
    });
  }
});
router.post("/login", async (req, res) => {
  let { email, password } = req.body;
  try {
    let data = await db.User.findOne({
      where: {
        email,
      },
      raw: true,
    });
    if (!data) throw Error("USER NOT FOUND");
    //comparing passwords
    var passwordIsValid = bcrypt.compareSync(password, data.password);
    if (!passwordIsValid) throw Error("invalid user");
    let token = jwt.sign(
      {
        id: data.id,
      },
      process.env.API_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      status: "success",
      message: "User successfully loggedin.",
      data: {
        token,
        user: {
          email,
          id: data.id,
          name: data.name,
        },
      },
    });
  } catch (err) {
    console.log("error in get all route", err);
    res.status(404).json({
      status: "failed",
      message: "Wrong email or password.",
    });
  }
});
// register  route
router.post("/register", async (req, res) => {
  let { name, email, password } = req.body;
  //making a salt of password
  password = bcrypt.hashSync(password, 8);
  try {
    let data = await db.User.create({
      name,
      email,
      password,
    });

    res.status(201).json({
      status: "success",
      message: "User successfully registered",
    });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      message: "No User created",
    });
  }
});

module.exports = router;
