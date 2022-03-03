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
const stripe = require("stripe")(
  "sk_test_51KYlhPSIC9DwF517FTJoGG8tTgVkO1lASMhutVwNmORegzmllo6c4hHxO0CsmHLkWHaaQI1gTWHnqNc0uNKx2f9200VjTujAEW"
);

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
const YOUR_DOMAIN = "http://localhost:4200/checkout";
app.get("/", async (req, res) => {
  // let filters = FILTER(req.query);
  // let data = await db.Product.findAll(filters);
  // console.log("new filter ", filters);
  let product = await stripe.products.create({
    name: "banana",
  });
  let price = await stripe.prices.create({
    unit_amount: 100,
    currency: "inr",
    product: product.id,
  });
  res.json({
    status: "success",
    message: "Welcome to the express app ",
    data: {
      product,
      price,
    },
  });
});

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

// checkout session
app.use("/create-checkout-session", async (req, res) => {
  console.log("ENTERED+++++++++++++++++++++++++++++++++++====");
  let product = await stripe.products.create({
    name: "banana",
  });
  let price = await stripe.prices.create({
    unit_amount: 10000,
    currency: "INR",
    // unit_amount_decimal: 100,
    product: product.id,
  });
  let product1 = await stripe.products.create({
    name: "guvava",
  });
  let price2 = await stripe.prices.create({
    unit_amount: 200,
    currency: "INR",
    product: product.id,
  });
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: price.id,
        quantity: 1,
      },
      {
        price: price2.id,
        quantity: 2,
      },
    ],
    mode: "payment",
    success_url: `${YOUR_DOMAIN}?success=true`,
    cancel_url: `${YOUR_DOMAIN}?canceled=true`,
  });
  console.log(session);
  res.redirect(303, session.url);
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
