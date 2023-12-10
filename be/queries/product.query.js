const PRODUCT_QUERY = {
  GET_ALL: "SELECT * FROM products",
  CREATE:
    "INSERT INTO products (name,image_path, price, description, createAt, updateAt) VALUES (?,?, ?, ?, ?, ?)",
  EDIT: "UPDATE products SET name = ?,image_path=?, price = ?, description = ?,createAt=?, updateAt=? WHERE id = ?",
  DELETE: "DELETE FROM products WHERE id = ?",
};

module.exports = { PRODUCT_QUERY };
