// middleware to check if the user is an admin
const auth = (req, res, next) => {

    // checks if the current user is an admin
    if (res.locals.currentUser.user_type === "administrator") {

        return next();

    } else {

        res.send("You do not have permission to view this page.");

    }
};

module.exports = auth;