const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
    const newPlant = req.body;
    const queryText = `INSERT INTO plant ("name", "kingdom", "clade", "order", "family", "subfamily", "genus")
                      VALUES ($1, $2, $3, $4, $5, $6, $7)`;
    const queryValues = [
      newPlant.name,
      newPlant.kingdom,
      newPlant.clade,
      newPlant.order,
      newPlant.family,
      newPlant.subfamily,
      newPlant.genus,
    ];
    pool.query(queryText, queryValues)
      .then(() => { res.sendStatus(201); })
      .catch((err) => {
        console.log('Error completing SELECT plant query', err);
        res.sendStatus(500);
      });
  });
  

module.exports = router;
