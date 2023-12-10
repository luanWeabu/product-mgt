const express = require("express");
const app = express();
const bodyParser = require("body-parser"); // Add this line
const port = 5000;
const { handleLogin, handleRefreshToken } = require("./services/auth.service");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
require("dotenv").config();
const cors = require("cors");
const path = require("path");
const {
  getUser,
  createUser,
  deleteUserById,
  editUserById,
} = require("./services/user.service");
const {
  getProduct,
  editProductById,
  createProduct,
  deleteProductById,
} = require("./services/product.service");
const { upload } = require("./config/storageUpload");
const { corsOptions } = require("./config/cors");

//cors
app.use(cors(corsOptions));

//login
app.post("/login", handleLogin);
app.post("/refresh-token", handleRefreshToken);

//uploadfile
app.post("/uploadfile", upload.single("image"), (req, res) => {
  const { filename } = req.file;
  return res.status(200).json({ filename });
});

//Users
app.get("/users", getUser);
app.post("/users", createUser);
app.put("/users/:id", editUserById);
app.delete("/users/:id", deleteUserById);

//Product
app.get("/products", getProduct);
app.post("/products", createProduct);
app.put("/products/:id", editProductById);
app.delete("/products/:id", deleteProductById);

//port
app.listen(port, () => {
  console.log(`server running http://localhost:${port}`);
});
