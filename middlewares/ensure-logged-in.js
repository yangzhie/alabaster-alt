// is a middleware to ensure that the user is logged in
function ensureLoggedIn(req, res, next) {

    // checks to see if the session is active (aka user is logged in)
    // if so, next()
    if (req.session.userId) {

        next();

    } else {

        res.send("You are not logged in.");

    }
}

module.exports = ensureLoggedIn;