const express = require("express");
const router = express.Router();
const db = require("../db/index");
const ensureLoggedIn = require("../middlewares/ensure-logged-in");
const auth = require("../middlewares/auth");

// gets the /watches page
router.get("/watches", ensureLoggedIn, (req, res) => {

    // selects all watches from the watches table to display
    const sql = 'SELECT * FROM watches;';

    db.query(sql, (err, result) => {

        if (err) {

            console.log(err);

        }

        // links the db to HTML
        let watches = result.rows;
        res.render("watches", { watches: watches });

    });
});

// sets up the page to POST a new watch
router.get("/watches/new", ensureLoggedIn, auth, (req, res) => {

    res.render("watches-new");

});

// displays the INDIVIDUAL watches
// assigns unique id to each
router.get("/watches/:id", ensureLoggedIn, (req, res) => {

    // params is used here because it is a dynamic page (due to id)
    let id = req.params.id;

    // sql safe injection
    // selects an INDIVIDUAL watch from id
    const sql = `
    SELECT * FROM watches
    WHERE id = $1;
    `;

    db.query(sql, [id], (err, result) => {

        if (err) {
            console.log(err);
        }

        // gets individual watch from db
        let watch = result.rows[0];
        // connects this watch from db to HTML
        res.render("watches-info", { watch: watch });

    });

});

// deletes a watch from the db
router.delete('/watches/:id', ensureLoggedIn, (req, res) => {

    // sql delete command
    const sql = `
      DELETE FROM watches WHERE id = $1 RETURNING *;
    `;

    // uses .params
    db.query(sql, [req.params.id], (err, result) => {

        if (err) {

            console.log(err);

        }

        console.log(result.rows);

        res.redirect('/watches');

    });
});

// the method to POST the watch
// POST the watch at /watches!!
router.post("/watches", ensureLoggedIn, auth, (req, res) => {

    // body is like params such that it takes input from the user
    // but it's used in POST methods exclusively
    let name = req.body.name;
    let imageUrl = req.body.image_url;
    let price = req.body.price;
    let description = req.body.description;

    // converts the price to null if it not a string
    price = price !== '' && !isNaN(price) ? price : null;

    // inserts all things into db - db first, VALUES from user second
    const sql = `
    INSERT INTO watches (name, image_url, price, description)
    VALUES ($1, $2, $3, $4);
    `;

    // easier to input as sql injection
    let arr = [name, imageUrl, price, description];

    db.query(sql, arr, (err, result) => {

        if (err) {

            console.log(err);

        }

        // no need to do anything further, the db has inputted thus redirect
        res.redirect('/watches');

    });
});

// sets up the PUT form of watches (to edit)
// this is ALL just a replica of /watches/:id
// need to do this because the :id path is being used again
// only difference is that it renders the watches-edit page
router.get("/watches/:id/edit", ensureLoggedIn, auth, (req, res) => {

    const sql = `
      SELECT * FROM watches
      WHERE id = $1;
    `;

    db.query(sql, [req.params.id], (err, result) => {

        if (err) {

            console.log(err);

        }

        let watch = result.rows[0];
        res.render("watches-edit", { watch: watch });

    });
});


// the actual PUT method
router.put("/watches/:id", ensureLoggedIn, auth, (req, res) => {

    // use the .body again like POST method instead of .params
    let name = req.body.name;
    let imageUrl = req.body.image_url;
    let price = req.body.price;
    let description = req.body.description;

    price = price === '' ? null : price;

    // inserts the user request into db
    const sql = `
      UPDATE watches
      SET 
        name = $1, 
        image_url = $2, 
        price = $3,
        description = $4
      WHERE id = $5;
    `;

    db.query(sql, [name, imageUrl, price, description, req.params.id], (err, result) => {

        if (err) {

            console.log(err);

        }

        // pretty straight forward
        res.redirect(`/watches/${req.params.id}`);

    });

});

module.exports = router;
