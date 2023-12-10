const { format } = require("date-fns");
const { db } = require("../config/dabase");
const { PRODUCT_QUERY } = require("../queries/product.query");
const currentDateTime = new Date();
const formattedDateTime = format(currentDateTime, "yyyy-MM-dd HH:mm:ss");

const getProduct = (req, res) => {
  db.query(PRODUCT_QUERY.GET_ALL, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
};

const createProduct = (req, res) => {
  const { name, price, description, image_path } = req.body;

  db.query(
    PRODUCT_QUERY.CREATE,
    [
      name,
      image_path,
      price,
      description,
      formattedDateTime,
      formattedDateTime,
    ],
    (err, result) => {
      if (err) throw err;
      res.json({ message: "Product added successfully", id: result.insertId });
    }
  );
};

const editProductById = (req, res) => {
  const { id } = req.params;
  const { name, price, description, image_path } = req.body;
  db.query(
    PRODUCT_QUERY.EDIT,
    [
      name,
      image_path,
      price,
      description,
      formattedDateTime,
      formattedDateTime,
      id,
    ],
    (err) => {
      if (err) throw err;
      res.json({ message: "Products updated successfully" });
    }
  );
};

const deleteProductById = (req, res) => {
  const { id } = req.params;
  db.query(PRODUCT_QUERY.DELETE, [id], (err) => {
    if (err) throw err;
    res.json({ message: "Product deleted successfully" });
  });
};

module.exports = {
  getProduct,
  createProduct,
  editProductById,
  deleteProductById,
};
