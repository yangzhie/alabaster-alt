function ensureLoggedIn(req, res, next) {

    if (req.session.userId) {

        next();

    } else {

        res.send("You are not logged in.");

    }
}

module.exports = ensureLoggedIn;