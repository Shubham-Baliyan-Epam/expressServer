const express = require("express");
const db = require("./model");
const app = express();
const empRouter = require("./routes/employee.route");
const authRouter = require("./routes/user.route");
const insRouter = require("./routes/insurance.route");
db.sequelize.sync();
app.use(express.json());
app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "Welcome to the express app ",
  });
});
app.use("/", authRouter);
app.use("/employee", empRouter);
app.use("/insurance", insRouter);

app.listen(8080, () => {
  console.log("express server + sequelize working on port 8080");
});
