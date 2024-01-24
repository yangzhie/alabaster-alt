const express = require("express");
const router = express.Router();
const db = require("../db/index");
const ensureLoggedIn = require("../middlewares/ensure-logged-in");
const auth = require("../middlewares/auth");

router.get("/watches", ensureLoggedIn, (req, res) => {

    const sql = 'SELECT * FROM watches;';

    db.query(sql, (err, result) => {

        if (err) {

            console.log(err);

        }

        let watches = result.rows;
        res.render("watches", { watches: watches });

    });
});

router.get("/watches/new", ensureLoggedIn, auth, (req, res) => {

    res.render("watches-new");

});

router.get("/watches/:id", ensureLoggedIn, (req, res) => {

    let id = req.params.id;

    const sql = `
    SELECT * FROM watches
    WHERE id = $1;
    `;

    db.query(sql, [id], (err, result) => {

        if (err) {
            console.log(err);
        }

        let watch = result.rows[0];
        res.render("watches-info", { watch: watch });

    });

});

router.delete('/watches/:id', ensureLoggedIn, (req, res) => {

    const sql = `
      DELETE FROM watches WHERE id = $1 RETURNING *;
    `;

    db.query(sql, [req.params.id], (err, result) => {

        if (err) {

            console.log(err);

        }

        console.log(result.rows);

        res.redirect('/watches');

    });
});

router.post("/watches", ensureLoggedIn, auth, (req, res) => {

    let name = req.body.name;
    let imageUrl = req.body.image_url;
    let price = req.body.price;
    let description = req.body.description;

    // converts the price to null if it not a string
    price = price !== '' && !isNaN(price) ? price : null;

    const sql = `
    INSERT INTO watches (name, image_url, price, description)
    VALUES ($1, $2, $3, $4);
    `;

    let arr = [name, imageUrl, price, description];

    db.query(sql, arr, (err, result) => {

        if (err) {

            console.log(err);

        }

        res.redirect('/watches');

    });
});

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

router.put("/watches/:id", ensureLoggedIn, auth, (req, res) => {

    let name = req.body.name;
    let imageUrl = req.body.image_url;
    let price = req.body.price;
    let description = req.body.description;

    price = price === '' ? null : price;

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

        res.redirect(`/watches/${req.params.id}`);

    });

});

module.exports = router;
