const auth = (req, res, next) => {

    if (res.locals.currentUser.user_type === "administrator") {

        return next();

    } else {

        res.send("You do not have permission to view this page.");

    }
};

module.exports = auth;