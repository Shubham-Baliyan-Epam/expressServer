const express = require("express");
const { Op } = require("sequelize");
const FILTER = require("./utils/filter");
const cors = require("cors");
const db = require("./model");
const app = express();
// const empRouter = require("./routes/employee.route");
// const studentRouter = require("./routes/student.route");
const productRouter = require("./routes/product.route");
const authRouter = require("./routes/user.route");
// const insRouter = require("./routes/insurance.route");
db.sequelize.sync().then(() => {
  db.Product.bulkCreate([
    {
      id: 1,
      name: "Green Sweater",
      category: "kids",
      price: 1299,
      brand: "Nike",
      rating: 5,
      stock: 20,
      img: "/assets/kid1.webp",
    },
    {
      id: 2,
      name: "Brooklyn Sweatshirt",
      category: "kids",
      price: 990,
      brand: "Nike",
      rating: 5,
      stock: 20,
      img: "/assets/kid2.webp",
    },
    {
      id: 3,
      name: "Nasa Spacesuit",
      category: "kids",
      price: 3999,
      brand: "Puma",
      rating: 5,
      stock: 20,
      img: "/assets/kid3.webp",
    },
    {
      id: 4,
      name: "Stripe T-Shirt",
      category: "kids",
      price: 499,
      brand: "Puma",
      rating: 5,
      stock: 20,
      img: "/assets/kid4.webp",
    },
    {
      id: 5,
      name: " Cap",
      category: "kids",
      price: 299,
      brand: "Reebok",
      rating: 5,
      stock: 20,
      img: "/assets/kid5.webp",
    },
    {
      id: 6,
      name: "Knitted Sweater",
      category: "kids",
      price: 499,
      rating: 5,
      brand: "Adidas",
      stock: 20,
      img: "/assets/kid6.webp",
    },
    {
      id: 7,
      name: "Brown Blazer",
      category: "mens",
      price: 699,
      brand: "H&M",
      rating: 5,
      stock: 20,
      img: "/assets/men1.webp",
    },
    {
      id: 8,
      name: "Blue Hat",
      category: "mens",
      price: 1999,
      brand: "Zara",
      rating: 5,
      stock: 20,
      img: "/assets/men2.webp",
    },
    {
      id: 9,
      name: "Hoodie",
      category: "mens",
      price: 1500,
      brand: "H&M",
      rating: 5,
      stock: 20,
      img: "/assets/men3.webp",
    },
    {
      id: 10,
      name: "SweatShirt ",
      category: "mens",
      price: 999,
      brand: "Fila",
      rating: 5,
      stock: 20,
      img: "/assets/men4.webp",
    },
    {
      id: 11,
      name: "White Shirt",
      category: "mens",
      price: 2999,
      rating: 5,
      brand: "Armani Exchange",
      stock: 20,
      img: "/assets/men5.webp",
    },
    {
      id: 12,
      name: "Women white top",
      category: "women",
      price: 12000,
      brand: "Mocha & Vodka",
      rating: 5,
      stock: 20,
      img: "/assets/women1.webp",
    },
    {
      id: 13,
      name: "Women pink sweatshirt",
      category: "women",
      price: 16000,
      brand: "GUCCI",
      rating: 5,
      stock: 20,
      img: "/assets/women2.webp",
    },
    {
      id: 14,
      name: "winter coat",
      category: "women",
      price: 20000,
      brand: "Prada",
      rating: 5,
      stock: 20,
      img: "/assets/women3.webp",
    },
    {
      id: 15,
      name: "Brown Knitted Sweater",
      category: "women",
      price: 100000,
      brand: "versace",
      rating: 5,
      stock: 20,
      img: "/assets/women4.webp",
    },
    {
      id: 16,
      name: "Pjamas",
      category: "women",
      price: 990,
      brand: "Jockey",
      rating: 5,
      stock: 20,
      img: "/assets/women5.webp",
    },
    {
      id: 17,
      name: "Women Long Coat",
      category: "women",
      price: 12000,
      brand: "H&M",
      rating: 5,
      stock: 20,
      img: "/assets/women6.webp",
    },
    {
      id: 18,
      name: "Fur Coat",
      category: "women",
      price: 10000,
      brand: "Louis Vuitton",
      rating: 5,
      stock: 20,
      img: "/assets/women7.webp",
    },
    {
      id: 19,
      name: "Vintage Camera",
      category: "electronics",
      price: 10000,
      brand: "Sony",
      rating: 5,
      stock: 20,
      img: "/assets/elect1.webp",
    },
    {
      id: 20,
      name: "IPhone 12",
      category: "electronics",
      price: 90000,
      brand: "Apple",
      rating: 5,
      stock: 20,
      img: "/assets/elect2.webp",
    },
    {
      id: 21,
      name: "Headphones",
      category: "electronics",
      price: 25000,
      brand: "BOSE",
      rating: 5,
      stock: 20,
      img: "/assets/elect4.webp",
    },
    {
      id: 22,
      name: "Macbook Pro",
      category: "electronics",
      price: 109000,
      brand: " Apple",
      rating: 5,
      stock: 20,
      img: "/assets/elect3.webp",
    },
    {
      id: 23,
      name: "Keyboard",
      category: "electronics",
      price: 7000,
      brand: "Apple",
      rating: 5,
      stock: 20,
      img: "/assets/elect5.webp",
    },
    {
      id: 24,
      name: "Apple Air",
      category: "electronics",
      price: 200000,
      brand: "Apple",
      rating: 5,
      stock: 20,
      img: "/assets/elect6.webp",
    },
  ]);
});
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
// app.use("/student", studentRouter);
// app.use("/insurance", insRouter);
app.use("/product", productRouter);

app.listen(8080, () => {
  console.log("express server + sequelize working on port 8080");
});
