const express = require("express");
const router = express.Router();
const db = require("../db/index");

router.get("/watches", (req, res) => {

    const sql = 'SELECT * FROM watches;';

    db.query(sql, (err, result) => {

        if (err) {

            console.log(err);

        }

        let watches = result.rows;
        res.render("watches", { watches: watches });

    });
});

router.get("/watches/new", (req, res) => {

    res.render("watches-new");

});

router.get("/watches/:id", (req, res) => {

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

router.post("/watches", (req, res) => {

    let name = req.body.name;
    let imageUrl = req.body.image_url;
    let price = req.body.price;
    let description = req.body.description;

    const sql = `
    INSTER INTO watches (name, image_url, price, description)
    VALUES ($1, $2, $3, $4);
    `

    let arr = [name, imageUrl, price, description];

    db.query(sql, arr, (err, result) => {

        if (err) {

            console.log(err);

        }

        res.redirect('/watches');

    });
});

router.get('/watches/:id/edit', (req, res) => {

    const sql = `
      SELECT * FROM watches
      WHERE id = $1;
    `

    db.query(sql, [req.params.id], (err, result) => {

        if (err) {

            console.log(err)

        }

        let watch = result.rows[0];
        res.render('watches-edit', { watch: watch });

    });
});

router.put('/watches/:id', (req, res) => {

    let name = req.body.name;
    let imageUrl = req.body.image_url;
    let price = req.body.price;
    let description = req.body.description;

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
