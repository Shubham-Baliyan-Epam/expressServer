const express = require("express");
const { Op } = require("sequelize");
const FILTER = require("./utils/filter");
const nodemailer = require("nodemailer");
const cors = require("cors");
const db = require("./model");
const app = express();
// const empRouter = require("./routes/employee.route");
// const studentRouter = require("./routes/student.route");
const productRouter = require("./routes/product.route");
const authRouter = require("./routes/user.route");
const orderRouter = require("./routes/order.route");
const transporter = nodemailer.createTransport({
  host: "mail.name.com",
  port: 587,
  auth: {
    user: "shubham@transcoders.run",
    pass: "Baliyan#123",
  },
});

// const insRouter = require("./routes/insurance.route");
db.sequelize
  .sync()
  .then()
  .catch((err) => console.log(err));
app.use(cors());
app.use(express.json());
app.get("/", async (req, res) => {
  let filters = FILTER(req.query);
  let data = await db.Product.findAll(filters);
  console.log("new filter ", filters);
  res.json({
    status: "success",
    message: "Welcome to the express app ",
    lenght: data.length,
    data,
  });
});
app.get("/sendmail", async (req, res) => {
  let email = req.query.email;
  console.log(email);
  try {
    await transporter.sendMail({
      from: "shubham@transcoders.run",
      to: email,
      subject: "Successfully Registered ",
      html: "<h1>Thank you for registering to our app</h1>",
    });
    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    res.send(400).json({
      status: "failed",
    });
  }
});
app.use("/", authRouter);
// app.use("/employee", empRouter);
// app.use("/student", studentRouter);
// app.use("/insurance", insRouter);
app.use("/product", productRouter);
app.use("/order", orderRouter);

app.listen(8080, () => {
  console.log("express server + sequelize working on port 8080");
});
