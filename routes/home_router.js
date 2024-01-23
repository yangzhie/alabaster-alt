const express = require("express");
const router = express.Router();
const db = require("../db/index");

router.get("/", (req, res) => {
    res.render("home");
});

router.get("/collections", (req, res) => {
    res.render("collections");
});

module.exports = router;
