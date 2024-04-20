const db = require('../db')

// middleware function
function setCurrentUser(req, res, next) {
    // .locals means that this can be used anywhere in any linking HTML document
    res.locals.currentUser = {};
    res.locals.isLoggedIn = false;

    // if the session id does not exist, exit out of the function (return)
    if (!req.session.userId) {

        return next();

    }

    const sql = `
    SELECT * FROM users WHERE id = $1;
    `
    // gets the session id and links it to the db's user
    db.query(sql, [req.session.userId], (err, result) => {

        if (err) {

            console.log(err);

        }

        // gets the user from db
        let user = result.rows[0];

        // links the user from the db to this currentUser variable
        res.locals.currentUser = user;
        res.locals.isLoggedIn = true;
        next();

    });
};

module.exports = setCurrentUser;