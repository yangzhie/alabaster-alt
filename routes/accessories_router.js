const express = require("express");
const router = express.Router();
const db = require("../db/index");
const ensureLoggedIn = require("../middlewares/ensure-logged-in");
const auth = require("../middlewares/auth");

router.get("/accessories", ensureLoggedIn, (req, res) => {

    const sql = 'SELECT * FROM accessories;';

    db.query(sql, (err, result) => {

        if (err) {

            console.log(err);

        }

        let accessories = result.rows;
        res.render("accessories", { accessories: accessories });

    });
});

router.get("/accessories/new", ensureLoggedIn, auth, (req, res) => {

    res.render("accessories-new");

});

router.get("/accessories/:id", ensureLoggedIn, (req, res) => {

    let id = req.params.id;

    const sql = `
    SELECT * FROM accessories
    WHERE id = ${id};
    `;

    db.query(sql, (err, result) => {

        if (err) {
            console.log(err);
        }

        let accessorie = result.rows[0];
        res.render("accessories-info", { accessorie: accessorie });

    });

});

router.delete('/accessories/:id', ensureLoggedIn, (req, res) => {

    const sql = `
      DELETE FROM accessories WHERE id = $1 RETURNING *;
    `;

    db.query(sql, [req.params.id], (err, result) => {

        if (err) {

            console.log(err);

        }

        console.log(result.rows);

        res.redirect('/accessories');

    });
});

router.post("/accessories", ensureLoggedIn, auth, (req, res) => {

    let name = req.body.name;
    let imageUrl = req.body.image_url;
    let imageUrl1 = req.body.image_url_1;
    let imageUrl2 = req.body.image_url_2;
    let price = req.body.price;
    let description = req.body.description;

    const sql = `
    INSERT INTO accessories (name, image_url, image_url_1, image_url_2, price, description)
    VALUES ($1, $2, $3, $4, $5, $6);
    `;

    // converts the price to null if it not a string
    price = price !== '' && !isNaN(price) ? price : null;

    let arr = [name, imageUrl, imageUrl1, imageUrl2, price, description];

    db.query(sql, arr, (err, result) => {

        if (err) {

            console.log(err);

        }

        res.redirect('/accessories');

    });
});

router.get("/accessories/:id/edit", ensureLoggedIn, auth, (req, res) => {

    const sql = `
      SELECT * FROM accessories
      WHERE id = $1;
    `

    db.query(sql, [req.params.id], (err, result) => {

        if (err) {

            console.log(err);

        }

        let accessorie = result.rows[0];
        res.render('accessories-edit', { accessorie: accessorie });

    });
});

router.put("/accessories/:id", ensureLoggedIn, auth, (req, res) => {

    let name = req.body.name;
    let imageUrl = req.body.image_url;
    let imageUrl1 = req.body.image_url_1;
    let imageUrl2 = req.body.image_url_2;
    let price = req.body.price;
    let description = req.body.description;

    const sql = `
      UPDATE accessories
      SET 
        name = $1, 
        image_url = $2, 
        image_url_1 = $3, 
        image_url_2 = $4, 
        price = $5,
        description = $6
      WHERE id = $7;
    `;

    price = price === '' ? null : price;

    let arr = [name, imageUrl, imageUrl1, imageUrl2, price, description, req.params.id];

    db.query(sql, arr, (err, result) => {

        if (err) {

            console.log(err);

        }

        res.redirect(`/accessories/${req.params.id}`);

    });

});

module.exports = router;
