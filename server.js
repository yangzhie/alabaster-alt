require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const expressLayouts = require("express-ejs-layouts");
const methodOverride = require("method-override");
const setCurrentUser = require("./middlewares/set-current-user.js");
const ensureLoggedIn = require("./middlewares/ensure-logged-in.js");
const auth = require("./middlewares/auth.js");

const db = require("./db/index");
const session = require("express-session");

// requiring routes
const sessionRouter = require("./routes/session_router.js");
const homeRouter = require("./routes/home_router.js");
const watchesRouter = require("./routes/watches_router.js");
const objectsRouter = require("./routes/objects_router.js");
const accessoriesRouter = require("./routes/accessories_router.js");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(expressLayouts);
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.SECRET || "arnav",
    resave: false,
    saveUninitialized: false
}));
app.use(setCurrentUser);

// using routes
app.use(sessionRouter);

app.use(homeRouter);

app.use(watchesRouter);

app.use(objectsRouter);

app.use(accessoriesRouter);

app.listen(port, () => {
    console.log("Server is now listening on port: " + port);
});