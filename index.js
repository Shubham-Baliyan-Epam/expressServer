const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const db = require("./model");
const app = express();
// const empRouter = require("./routes/employee.route");
// const studentRouter = require("./routes/student.route");
const productRouter = require("./routes/product.route");
const authRouter = require("./routes/user.route");
const orderRouter = require("./routes/order.route");

//creating transporter for nodeMailer
const transporter = nodemailer.createTransport({
  host: "mail.name.com",
  port: 587,
  auth: {
    user: "shubham@transcoders.run",
    pass: "############",
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
  res.json({
    status: "success",
    message: "Welcome to the express app ",
  });
});

//send mail functionality
app.post("/sendmail", async (req, res) => {
  let email = req.body.email;
  let message = req.body.message;
  let subject = req.body.subject;
  console.log(email);
  try {
    await transporter.sendMail({
      from: "shubham@transcoders.run",
      to: email,
      subject: subject,
      html: "<h1>" + message + "</h1>",
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

//routers
app.use("/", authRouter);
// app.use("/employee", empRouter);
// app.use("/student", studentRouter);
// app.use("/insurance", insRouter);
app.use("/product", productRouter);
app.use("/order", orderRouter);

//start the server
app.listen(8080, () => {
  console.log("express server + sequelize working on port 8080");
});
