// connects to the db, in separate file
const pg = require("pg");

// connection string
const connectionString = process.env.DATABASE_URL;

const db = new pg.Pool({
    // .env has this connectionString
    connectionString: connectionString,
});

module.exports = db;