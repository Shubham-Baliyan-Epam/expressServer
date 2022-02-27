const express = require("express");
const { Op } = require("sequelize");
const FILTER = require("./utils/filter");
const cors = require("cors");
const db = require("./model");
const app = express();
const empRouter = require("./routes/employee.route");
const studentRouter = require("./routes/student.route");
const authRouter = require("./routes/user.route");
// const insRouter = require("./routes/insurance.route");
db.sequelize.sync();
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
app.use("/", authRouter);
// app.use("/employee", empRouter);
app.use("/student", studentRouter);
// app.use("/insurance", insRouter);

app.listen(8080, () => {
  console.log("express server + sequelize working on port 8080");
});
