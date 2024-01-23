const express = require("express");
const router = express.Router();
const db = require("../db/index");

router.get("/accessories", (req, res) => {

    const sql = 'SELECT * FROM accessories;';

    db.query(sql, (err, result) => {

        if (err) {

            console.log(err);

        }

        let accessories = result.rows;
        res.render("accessories", { accessories: accessories });

    });
});

router.get("/accessories/new", (req, res) => {

    res.render("accessories-new");

});

router.get("/accessories/:id", (req, res) => {

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

router.post("/accessories", (req, res) => {

    let name = req.body.name;
    let imageUrl = req.body.image_url;
    let imageUrl1 = req.body.image_url_1;
    let imageUrl2 = req.body.image_url_2;
    let price = req.body.price;
    let description = req.body.description;

    const sql = `
    INSTER INTO accessories (name, image_url, image_url_1, image_url_2, price, description)
    VALUES ($1, $2, $3, $4, $5, $6);
    `

    let arr = [name, imageUrl, imageUrl1, imageUrl2, price, description];

    db.query(sql, arr, (err, result) => {

        if (err) {

            console.log(err);

        }

        res.redirect('/accessories');

    });
});

router.get('/accessories/:id/edit', (req, res) => {

    const sql = `
      SELECT * FROM accessories
      WHERE id = $1;
    `

    db.query(sql, [req.params.id], (err, result) => {

        if (err) {

            console.log(err)

        }

        let accessorie = result.rows[0];
        res.render('accessories-edit', { accessorie: accessorie });

    });
});

router.put('/accessories/:id', (req, res) => {

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

    let arr = [name, imageUrl, imageUrl1, imageUrl2, price, description, req.params.id];

    db.query(sql, arr, (err, result) => {

        if (err) {

            console.log(err);

        }

        res.redirect(`/accessories/${req.params.id}`);

    });

});

module.exports = router;
