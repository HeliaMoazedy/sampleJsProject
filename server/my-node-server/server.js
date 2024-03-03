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
  setTimeout(() => {
    res.send(JSON.stringify(data));
  }, 1500);
});

// API endpoint for products
app.get("/products", (req, res) => {
  const data = require("./mockData/products.json");
  res.header("Content-Type", "application/json");
  setTimeout(() => {
    res.send(JSON.stringify(data));
  }, 1500);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Importing Modules:

// The code starts by importing the express module, which is a web application framework for Node.js.
// Creating an Express Application:

// An instance of the Express application is created and stored in the variable app.
// Setting up Port:

// It defines the port number where the server will listen for incoming requests. It uses the process.env.PORT variable if it's set, otherwise defaults to port 3000.
// Setting up CORS (Cross-Origin Resource Sharing):

// CORS headers are set to allow requests from any origin (*), with specific methods (GET, POST, PUT, DELETE), and headers (Content-Type). Access-Control-Allow-Credentials is set to true to allow credentials such as cookies to be included in the requests.
// API Endpoint for bestSeller:

// Defines a route (/bestSeller) for handling GET requests.
// Reads mock data from a JSON file (bestSeller.json) located in a directory named mockData.
// Sets the response header to indicate that the response contains JSON data.
// Sends the JSON data as the response when this endpoint is accessed.
// API Endpoint for products:

// Similar to the /bestSeller endpoint, but this one handles GET requests to the /products route and returns data from products.json.
// Starting the Server:

// The server is started by calling the listen method on the app object, specifying the port to listen on.
// A message is logged to the console indicating that the server is running and on which port.
// Commented Code:

// There are commented-out lines of code inside the /bestSeller endpoint (setTimeout block). This appears to be a placeholder for simulating asynchronous behavior with a delay, but it's currently commented out, so the response is sent immediately without any delay.
