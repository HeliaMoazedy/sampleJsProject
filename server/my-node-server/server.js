// server.js
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

// API endpoint for bestSeller
app.get("/bestSeller", (req, res) => {
  const data = require("./mockData/bestSeller.json");
  res.header("Content-Type", "application/json");
  // setTimeout(() => {
  //   res.send(JSON.stringify(data));
  // }, 1500);
  res.send(JSON.stringify(data));
});

// API endpoint for products
app.get("/products", (req, res) => {
  const data = require("./mockData/products.json");
  res.header("Content-Type", "application/json");
  res.send(JSON.stringify(data));
});
// app.get("/selectedItem", (req, res) => {
//   const data = require("./mockData/selectedItem.json");
//   res.header("Content-Type", "application/json");
//   res.send(JSON.stringify(data));
// });

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
