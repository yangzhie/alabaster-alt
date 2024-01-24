const express = require("express");
const router = express.Router();
const db = require("../db/index");
const ensureLoggedIn = require('../middlewares/ensure-logged-in')

router.get("/", (req, res) => {
    res.redirect("login");
});

router.get("/collections", ensureLoggedIn, (req, res) => {
    res.render("collections");
});

module.exports = router;
