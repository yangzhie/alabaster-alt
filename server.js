require("dotenv").config();

const express = require("express");
const app = express();
const port = 8080;

const expressLayouts = require("express-ejs-layouts");
const methodOverride = require("method-override");

const db = require("./db/index");

const homeRouter = require("./routes/home_router.js");
const watchesRouter = require("./routes/watches_router.js");
const objectsRouter = require("./routes/objects_router.js");
const accessoriesRouter = require("./routes/accessories_router.js");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(expressLayouts);
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));

app.use(homeRouter);

app.use(watchesRouter);

app.use(objectsRouter);

app.use(accessoriesRouter);

app.listen(port, () => {
    console.log("Server is now listening on port: " + port);
});