const jwt = require("jsonwebtoken");

const verifyToken = (token) => {
  if (!token) {
    return false;
  }

  try {
    const verified = jwt.verify(token, process.env.SECRET_TOKEN);

    return true;
  } catch (err) {
    return false;
  }
};

exports.verifyToken = verifyToken;
