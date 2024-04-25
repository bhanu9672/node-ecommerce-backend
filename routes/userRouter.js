const express = require( "express" )
const router = express.Router();

const User = require("../models/User");
const { RegisterNewUser, LogInUser } = require("../middlewares/userMiddleware");

// Register Or add New User Api
router.post("/register", RegisterNewUser);

// LogIN Api
router.post("/login", LogInUser);

module.exports = router;