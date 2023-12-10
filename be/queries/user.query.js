const USER_QUERY = {
  GET_ALL: "SELECT * FROM users",
  CREATE: "INSERT INTO users (firstname ,lastname, email) VALUES (?, ?,?)",
  EDIT: "UPDATE users SET fristName = ?,lastName = ?, email = ? WHERE id = ?",
  DELETE: "DELETE FROM users WHERE id = ?",
};
modules.exports = { USER_QUERY };
