const jwt = require("jsonwebtoken");

//authorizes a web token to allow access to private routes

const verifyWorker = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("Access Denied");

  try {
    // Only authorizes users with a worker token
    jwt.verify(token, process.env.AUTH_TOKEN_SECRET_WORKER);

    next();
  } catch (error) {
    try {
      // Authorizes users with a manager token, because managers can do what workers can
      jwt.verify(token, process.env.AUTH_TOKEN_SECRET_WORKER);

      next();
    } catch (error) {
      res.status(400).send("Access Denied");
    }
  }
};

const verifyManager = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("Access Denied");

  try {
    // Only authorizes users with a manager token
    jwt.verify(token, process.env.AUTH_TOKEN_SECRET_MANAGER);

    next();
  } catch (error) {
    res.status(400).send("Access Denied");
  }
};

module.exports = {
  verifyWorker,
  verifyManager,
};
