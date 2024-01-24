const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcrypt");
const expressLayouts = require("express-ejs-layouts");;

router.get("/login", (req, res) => {

    res.render("login", { layout: "login-layout" });

});

router.post("/login", (req, res) => {

    const sql = `
    SELECT * FROM users
    WHERE username = $1;
  `

    const tmp = req.body.username;
    console.log("Username:", tmp);

    db.query(sql, [tmp], (err, result) => {

        if (err) {

            console.log(err);
            res.render("login");
            return;

        }

        if (result.rows.length === 0) {

            console.log("User does not exist.");
            res.render("login");
            return;

        }

        const plainTextPass = req.body.password;
        const hashedPass = result.rows[0].password_digest;

        bcrypt.compare(plainTextPass, hashedPass, (err, isCorrect) => {

            if (err) {
                console.log(err);
                res.render("login");
                return;
            }

            if (!isCorrect) {

                console.log("Your username or password is incorrect.");
                res.render("login");
                return;

            }

            req.session.userId = result.rows[0].id;
            res.redirect("/collections");

        });
    });
});

router.delete('/logout', (req, res) => {

    req.session.userId = null;
    res.redirect('/login');

});

module.exports = router;