const { response } = require("express");
const User = require("../model/user.model");
const Encrypt = require("../config/crypto.js");
const jwt = require("jsonwebtoken");

// Add new user
const createUser = async (req, res) => {
  if (req.body) {
    const user = new User(req.body);
    await user
      .save()
      .then((data) => {
        res.status(200).send({ data: data });
      })
      .catch((error) => {
        res.status(500).send({ error: error.message });
      });
  }
};

// const getUserById = async (req, res) => {
//     if (req.params && req.params.userId) {
//         await User.findById(req.params.userId)
//             .then(data => {
//                 res.status(200).send({ data: data });
//             })
//             .catch(error => {
//                 res.status(500).send({ error: error.message });
//             })
//     }
// }

// Get user by user id
const getUserByEmail = async (req, res) => {
  if (req.params && req.params.email) {
    await User.find({ email: req.params.email })
      .then((data) => {
        res.status(200).send({ data });
      })
      .catch((error) => {
        res.status(500).send({ error: error.message });
      });
  }
};

const checkEmail = (email) => {
  return User.findOne({ email: email }).then((result) => {
    return result;
  });
};

const setUserRole = async (req, res) => {
  if (req.params && req.params.email) {
    checkEmail(req.params.email).then(async (userExists) => {
      if (userExists) {
        let token;

        if (userExists.role === "worker") {
          token = jwt.sign(
            { id: userExists._id, role: 1 },
            process.env.AUTH_TOKEN_SECRET_WORKER
          );
        } else {
          //Is manager
          token = jwt.sign(
            { id: userExists._id, role: 2 },
            process.env.AUTH_TOKEN_SECRET_MANAGER
          );
        }

        res.header("auth-token", token);
        res.header("Access-Control-Expose-Headers", "auth-token");
        res.status(200).send(userExists._id);
      } else {
        res.status(500).send(`Sorry, ${req.params.email} is not an employee.`);
      }
    });
  }
};

const getAll = async (req, res) => {
  await User.find()
    .then((data) => {
      res.status(200).send({ data: data });
    })
    .catch((error) => {
      res.status(500).send({ error: error.message });
    });
};

const updateUser = async (req, res) => {
  // await User.find({ userId: req.params.userId })
  const userId = req.params.userId;
  // let token = JSON.parse(req.headers['authorization'])
  let token = req.headers["authorization"];
  token = Encrypt.encrypt(token);
  await User.findByIdAndUpdate({ _id: userId }, { accessToken: token })
    .then((data) => {
      res.status(200).send({ data: data });
    })
    .catch((error) => {
      console.log("error", error);
      res.status(500).send({ error: error.message });
    });
};

module.exports = {
  createUser,
  getUserByEmail,
  setUserRole,
  // getAll,
  updateUser,
};
