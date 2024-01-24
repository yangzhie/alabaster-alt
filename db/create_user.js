require("dotenv").config();

const bcrypt = require("bcrypt");
const db = require("./index.js");

let username = "username";
let plainTextPass = "password";
let userType = "public";

const saltRound = 10;

bcrypt.genSalt(saltRound, (err, salt) => {

    bcrypt.hash(plainTextPass, salt, (err, hashedPass) => {

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