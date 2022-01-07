const Router = require("express").Router();
const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel");

Router.get("/", async (req, res) => {
  const cookie = req.query.cookie;

  if (!cookie) {
    return res.sendStatus(204);
  }

  try {
    const verify = jwt.verify(cookie, process.env.JWTSECRET);

    if (!verify) {
      return res.sendStatus(400);
    }

    const foundUser = await UserModel.findById(verify.userid);

    if (!foundUser) {
      return res.sendStatus(400);
    }

    return res.status(200).json({ user: foundUser });
  } catch (error) {
    console.log({ error });
    return res.sendStatus(500);
  }
});

module.exports = Router