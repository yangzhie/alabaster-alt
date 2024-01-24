const express = require("express");
const router = express.Router();
const db = require("../db/index");
const ensureLoggedIn = require("../middlewares/ensure-logged-in");
const auth = require("../middlewares/auth");

router.get("/objects", ensureLoggedIn, (req, res) => {

    const sql = 'SELECT * FROM objects;';

    db.query(sql, (err, result) => {

        if (err) {

            console.log(err);

        }

        let objects = result.rows;
        res.render("objects", { objects: objects });

    });
});

router.get("/objects/new", ensureLoggedIn, auth, (req, res) => {

    res.render("objects-new");

});

router.get("/objects/:id", ensureLoggedIn, (req, res) => {

    let id = req.params.id;

    const sql = `
    SELECT * FROM objects
    WHERE id = ${id};
    `;

    db.query(sql, (err, result) => {

        if (err) {
            console.log(err);
        }

        let object = result.rows[0];
        res.render("objects-info", { object: object });

    });

});

router.delete('/objects/:id', ensureLoggedIn, (req, res) => {

    const sql = `
      DELETE FROM objects WHERE id = $1 RETURNING *;
    `;

    db.query(sql, [req.params.id], (err, result) => {

        if (err) {

            console.log(err);

        }

        console.log(result.rows);

        res.redirect('/objects');

    });
});

router.post("/objects", ensureLoggedIn, auth, (req, res) => {

    let name = req.body.name;
    let imageUrl = req.body.image_url;
    let imageUrl1 = req.body.image_url_1;
    let imageUrl2 = req.body.image_url_2;
    let imageUrl3 = req.body.image_url_3;
    let imageUrl4 = req.body.image_url_4;
    let imageUrl5 = req.body.image_url_5;
    let imageUrl6 = req.body.image_url_6;
    let imageUrl7 = req.body.image_url_7;
    let imageUrl8 = req.body.image_url_8;
    let imageUrl9 = req.body.image_url_9;
    let price = req.body.price;
    let description = req.body.description;

    // converts the price to null if it not a string
    price = price !== '' && !isNaN(price) ? price : null;

    const sql = `
    INSERT INTO objects (name, image_url, image_url_1, image_url_2, image_url_3, image_url_4, image_url_5, image_url_6, image_url_7, image_url_8, image_url_9, price, description)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13);
    `

    let arr = [name, imageUrl, imageUrl1, imageUrl2, imageUrl3, imageUrl4, imageUrl5, imageUrl6, imageUrl7, imageUrl8, imageUrl9, price, description];

    db.query(sql, arr, (err, result) => {

        if (err) {

            console.log(err);

        }

        res.redirect('/objects');

    });
});

router.get("/objects/:id/edit", ensureLoggedIn, auth, (req, res) => {

    const sql = `
      SELECT * FROM objects
      WHERE id = $1;
    `

    db.query(sql, [req.params.id], (err, result) => {

        if (err) {

            console.log(err);

        }

        let object = result.rows[0];
        res.render("objects-edit", { object: object });

    });
});

router.put("/objects/:id", ensureLoggedIn, auth, (req, res) => {

    let name = req.body.name;
    let imageUrl = req.body.image_url;
    let imageUrl1 = req.body.image_url_1;
    let imageUrl2 = req.body.image_url_2;
    let imageUrl3 = req.body.image_url_3;
    let imageUrl4 = req.body.image_url_4;
    let imageUrl5 = req.body.image_url_5;
    let imageUrl6 = req.body.image_url_6;
    let imageUrl7 = req.body.image_url_7;
    let imageUrl8 = req.body.image_url_8;
    let imageUrl9 = req.body.image_url_9;
    let price = req.body.price;
    let description = req.body.description;

    const sql = `
      UPDATE objects
      SET 
        name = $1, 
        image_url = $2, 
        image_url_1 = $3, 
        image_url_2 = $4, 
        image_url_3 = $5, 
        image_url_4 = $6, 
        image_url_5 = $7, 
        image_url_6 = $8, 
        image_url_7 = $9, 
        image_url_8 = $10, 
        image_url_9 = $11, 
        price = $12,
        description = $13
      WHERE id = $14;
    `;

    price = price === '' ? null : price;

    let arr = [name, imageUrl, imageUrl1, imageUrl2, imageUrl3, imageUrl4, imageUrl5, imageUrl6, imageUrl7, imageUrl8, imageUrl9, price, description, req.params.id];

    db.query(sql, arr, (err, result) => {

        if (err) {

            console.log(err);

        }

        res.redirect(`/objects/${req.params.id}`);

    });

});

module.exports = router;
