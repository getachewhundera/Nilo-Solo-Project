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
router.post('/', isAuthenticated, (req, res) => {
    console.log('Received add item payload:', req.body);
    const newExperience = req.body;
    const userId = req.user.id; // Accessing the user's ID from the req.user object
    const queryText = `INSERT INTO list (description, user_id)
                       VALUES ($1, $2)
                       RETURNING *`; // RETURNING * will return all columns of the inserted row
    const queryValues = [newExperience.description, userId];
  
    console.log('Query values:', queryValues);
  
    pool.query(queryText, queryValues)
      .then((result) => {
        console.log('Item inserted:', result.rows[0]);
        res.status(200).send(result.rows[0]); // Send the inserted item back to the client
      })
      .catch((err) => {
        console.log('Error INSERTING feedback query', err);
        res.sendStatus(500).send('Error adding item');
      });
  });

module.exports = router;

/**
 * PUT route template
 */
router.put('/:id', (req, res) => {
  const queryText = 'UPDATE list SET is_completed = NOT is_completed WHERE id = $1 RETURNING *';
  const queryValues = [req.params.id];

  pool.query(queryText, queryValues)
    .then((result) => {
      res.send(result.rows[0]);
    })
    .catch((err) => {
      console.error('Error updating list item:', err);
      res.status(500).send('Server Error');
    });
});

/**
 * DELETE route template
 */

router.delete('/:id', (req, res) => {
  const queryText = 'DELETE FROM list WHERE id = $1 AND is_completed = false';
  const queryValues = [req.params.id];

  pool.query(queryText, queryValues)
    .then((result) => {
      if (result.rowCount > 0) {
        res.send('List item deleted');
      } else {
        res.status(400).send('Item is already completed or does not exist');
      }
    })
    .catch((err) => {
      console.error('Error deleting list item:', err);
      res.status(500).send('Server Error');
    });
});