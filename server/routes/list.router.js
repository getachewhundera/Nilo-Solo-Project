const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  const queryText = 'SELECT * FROM list ';
  pool.query(queryText)
    .then((result) => { res.send(result.rows); })
    .catch((err) => {
      console.log('Error completing SELECT list query', err);
      res.sendStatus(500);
    });
});


/**
 * POST route template
 */
router.post('/', (req, res) => {
    console.log('Received add item payload:', req.body);
    const newExperience = req.body;
    const queryText = `INSERT INTO list (description)
                       VALUES ($1)
                       RETURNING *`; // RETURNING * will return all columns of the inserted row
    const queryValues = [newExperience.description];
  
    console.log('Query values:', queryValues);
  
    pool.query(queryText, queryValues)
      .then((result) => {
        console.log('Item inserted:', result.rows[0]);
        res.send(result.rows[0]); // Send the inserted item back to the client
      })
      .catch((err) => {
        console.log('Error INSERTING feedback query', err);
        res.sendStatus(500);
      });
  });

module.exports = router;
