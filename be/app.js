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
const { API_ENDPOINT } = require("./constants/api-endpoint");

//cors
app.use(cors(corsOptions));

//login
app.post(API_ENDPOINT.LOGIN, handleLogin);
app.post(API_ENDPOINT.REFRESH_TOKEN, handleRefreshToken);

//uploadfile
app.post(API_ENDPOINT.UPLOAD_FILE, upload.single("image"), (req, res) => {
  const { filename } = req.file;
  return res.status(200).json({ filename });
});

//Users
app.get(API_ENDPOINT.USER, getUser);
app.post(API_ENDPOINT.USER, createUser);
app.put(`${API_ENDPOINT.USER}/:id`, editUserById);
app.delete(`${API_ENDPOINT.USER}/:id`, deleteUserById);

//Product
app.get(API_ENDPOINT.PRODUCT, getProduct);
app.post(API_ENDPOINT.PRODUCT, createProduct);
app.put(`${API_ENDPOINT.PRODUCT}/:id`, editProductById);
app.delete(`${API_ENDPOINT.PRODUCT}/:id`, deleteProductById);

//port
app.listen(port, () => {
  console.log(`server running http://localhost:${port}`);
});
