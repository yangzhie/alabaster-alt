const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require("../db/index");

router.get('/user/new', (req, res) => {

    res.render('register-form')

})

router.post('/register', (req, res) => {

    const username = req.body.username
    const password_digest = req.body.password

    const sql = `
        SELECT * FROM users
        WHERE username = $1;
    `

    db.query(sql, [username], (err, result) => {

        if (err) {
            console.log(err);
            return;
        }

        if (result.rowCount > 0) {

            console.log('Username is already taken.');
            res.render('register-form');
            return

        } else {

            const saltRound = 10

            bcrypt.genSalt(saltRound, (err, salt) => {

                if (err) {
                    console.log(err);
                    return;
                }

                bcrypt.hash(password_digest, salt, (err, hashedPass) => {

                    if (err) {
                        console.log(err);
                        return;
                    }

                    const sql = `
                        INSERT INTO users
                        (username, password_digest, user_type)
                        VALUES
                        ($1, $2, 'public');
                    `

                    db.query(sql, [username, hashedPass], (err, result) => {

                        if (err) {

                            console.log(err);
                            return;

                        } else {

                            console.log('User created.');
                            res.redirect('/')
                        }

                    })

                })

            })

        }

    })
})

module.exports = router;