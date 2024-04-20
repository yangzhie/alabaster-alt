require("dotenv").config();

const bcrypt = require("bcrypt");
const db = require("./index.js");

// username added to db
let username = "admin";
// pass added to db
let plainTextPass = "root";
// userType added to db
let userType = "administrator";

const saltRound = 10;

bcrypt.genSalt(saltRound, (err, salt) => {

    // this hashes the "root password"
    bcrypt.hash(plainTextPass, salt, (err, hashedPass) => {

        // inserts the hashedpass to the db, "replaces" plaintextpass
        const sql = `
        INSERT INTO users (username, password_digest, user_type) 
        VALUES ('${username}', '${hashedPass}', '${userType}') 
        RETURNING id
        ;`;

        db.query(sql, (err, result) => {

            if (err) {

                console.log(err);

            } else {

                console.log("User has been created.");

            }
        });

    });
});