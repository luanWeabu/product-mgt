const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { generateAccesToken } = require("../auth/authToken");
const { db } = require("../config/dabase");
const { AUTH_QUERY } = require("../queries/auth.query");
const { ERROR_ENDPOINT } = require("../constants/error-endpoint");
require("dotenv").config();

let refreshTokens = [];

/**
 *  Login
 * @param {*} request data in be
 * @param {*} res
 */
async function handleLogin(req, res) {
  try {
    const { email, password } = req.body;
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: ERROR_ENDPOINT.EMAIL_PASSWORD_REQUIRED });
    }
    db.query(AUTH_QUERY.GET_USER_EMAIL, [email], async (error, results) => {
      if (error) {
        console.error("MySQL Error: ", error);
        return res
          .status(500)
          .json({ message: ERROR_ENDPOINT.INTERNAL_SERVER });
      }

      if (results.length === 0) {
        return res.status(401).json({ message: ERROR_ENDPOINT.USER_NOT_FOUND });
      }

      const user = results[0];

      if (!user.password) {
        console.error("Password is missing in user object:", user);
        return res
          .status(500)
          .json({ message: ERROR_ENDPOINT.INTERNAL_SERVER });
      }

      try {
        // Compare hashed password
        const passwordMatch = await bcrypt.compare(user.password, hash);
        if (!passwordMatch) {
          return res
            .status(401)
            .json({ message: ERROR_ENDPOINT.INCORRECT_PASSWORD });
        }

        // Generate JWT token
        const accessToken = jwt.sign(
          { userId: user.id, email: user.email },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "1h" }
        );

        res.status(200).json({ accessToken });
      } catch (compareError) {
        console.error("Bcrypt Compare Error: ", compareError);
        res.status(500).json({ message: ERROR_ENDPOINT.INTERNAL_SERVER });
      }
    });
  } catch (error) {
    res.status(500).send({ messagae: ERROR_ENDPOINT.SOMETHING_WRONG });
  }
}

/**
 *  Resfresh Tokken
 * @param {*} req
 * @param {*} res
 * @returns
 */
function handleRefreshToken(req, res) {
  const refreshToken = req.body.token;
  if (refreshToken === null) return res.sendStatus(401);
  if (refreshTokens.includes(refreshToken)) return res.sendStatus(403);
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    const accessToken = generateAccesToken({ email: user.email });
    res.json({ accessToken });
  });
}

module.exports = { handleLogin, handleRefreshToken };
