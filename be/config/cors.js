require("dotenv").config();

const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
module.exports = { corsOptions };
