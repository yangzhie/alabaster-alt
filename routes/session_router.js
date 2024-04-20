const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcrypt");
const expressLayouts = require("express-ejs-layouts");;

router.get("/login", (req, res) => {

    res.render("login-layout", { layout: "login-layout" });

});

// is the session router
// notice how it is post, as it takes input from the user, implicitly
router.post("/login", (req, res) => {


    const sql = `
    SELECT * FROM users
    WHERE username = $1;
  `
    // gets the username in the db
    const tmp = req.body.username;
    console.log("Username:", tmp);

    db.query(sql, [tmp], (err, result) => {

        if (err) {

            console.log(err);
            return;

        }

        // no user in the db was found (only admin or username exist, nothing else)
        if (result.rows.length === 0) {

            console.log("User does not exist.");
            res.send("Login error. Please re-check username or password.");
            return;

        }

        // bcrypt is used here 
        // this specific plaintextpass refers to the input that the person who is accessing types 
        const plainTextPass = req.body.password;
        // the hashedpass gets the password directly from the db
        const hashedPass = result.rows[0].password_digest;

        // compares the user input to the actual password
        bcrypt.compare(plainTextPass, hashedPass, (err, isCorrect) => {

            if (err) {
                console.log(err);
                return;
            }

            // if it's not equal, go back to login page, no access
            if (!isCorrect) {

                console.log("Your username or password is incorrect.");
                res.render("login-error");
                return;

            }

            // if they both are the same, before redirecting to the next page
            // it links the db id of the user to a session userId - this can now be used anywhere
            req.session.userId = result.rows[0].id;
            res.redirect("/collections");

        });
    });
});

// for logout, the HTTP method is delete
router.delete('/logout', (req, res) => {

    // deletes session - null
    req.session.userId = null;
    res.redirect('/login');

});

module.exports = router;