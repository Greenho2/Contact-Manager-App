const express = require("express");

const router = express.Router();

const{regUser,loginUser, curUser} = require("../controllers/userController");
const { validateToken } = require("../midWare/validateTokenHandler");

router.post("/register", regUser);

router.post("/login",loginUser);

router.get("/current",validateToken,curUser);

module.exports = router;
