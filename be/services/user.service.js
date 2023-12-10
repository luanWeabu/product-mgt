const { db } = require("../config/dabase");
const { SUCCESS_ENDPOINT } = require("../constants/success-endpoint");
const { USER_QUERY } = require("../queries/user.query");

const getUser = (req, res) => {
  db.query(USER_QUERY.GET_ALL, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
};

const createUser = (req, res) => {
  const { firstname, lastname, email } = req.body;

  db.query(USER_QUERY.CREATE, [firstname, lastname, email], (err, result) => {
    if (err) throw err;
    res.json({ message: SUCCESS_ENDPOINT.USER_CREATE, id: result.insertId });
  });
};

const editUserById = (req, res) => {
  const { id } = req.params;
  const { firstname, lastname, email } = req.body;
  db.query(USER_QUERY.EDIT, [firstname, lastname, email, id], (err) => {
    if (err) throw err;
    res.json({ message: SUCCESS_ENDPOINT.USER_UPDATE });
  });
};

const deleteUserById = (req, res) => {
  const { id } = req.params;
  db.query(USER_QUERY.DELETE, [id], (err) => {
    if (err) throw err;
    res.json({ message: SUCCESS_ENDPOINT.USER_DELETE });
  });
};

module.exports = { getUser, createUser, editUserById, deleteUserById };
