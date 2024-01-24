const express = require("express");
const router = express.Router();
const db = require("../db/index");
const ensureLoggedIn = require('../middlewares/ensure-logged-in')

router.get("/", ensureLoggedIn, (req, res) => {
    res.render("home");
});

router.get("/collections", ensureLoggedIn, (req, res) => {
    res.render("collections");
});

module.exports = router;
