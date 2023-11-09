const express = require('express');
const { rejectUnauthenticated,} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', rejectUnauthenticated, (req, res) => {
  const userId = req.user.id;
  const queryText = 'SELECT * FROM list WHERE user_id = $1';
  pool.query(queryText, [userId])
    .then((result) => res.send(result.rows))
    .catch((err) => {
      console.error('Error completing SELECT list query', err);
      res.sendStatus(500);
    });
});


/**
 * POST route template
 */
router.post('/', rejectUnauthenticated, (req, res) => {
  const newExperience = req.body;
  const userId = req.user.id;
  const queryText = `INSERT INTO list (description, date, user_id)
                     VALUES ($1, $2, $3)
                     RETURNING *`;
  const queryValues = [newExperience.description, newExperience.date, userId];

  pool.query(queryText, queryValues)
    .then((result) => {
      res.status(200).send(result.rows[0]);
    })
    .catch((err) => {
      console.error('Error INSERTING feedback query', err);
      res.status(500).send('Error adding item');
    });
});


/**
 * PUT route template
 */
router.put('/:id', rejectUnauthenticated, (req, res) => {
  // Extracting variables from the request body
  const { description, date, is_completed } = req.body;
  const listItemId = req.params.id;
  const userId = req.user.id;

  // Construct the SQL query for the update
  const queryText = `
    UPDATE list
    SET description = $1, date = $2, is_completed = $3
    WHERE id = $4 AND user_id = $5
    RETURNING *;
  `;

  const queryValues = [description, date, is_completed, listItemId, userId];

  pool.query(queryText, queryValues)
    .then((result) => {
      if (result.rows.length > 0) {
        res.send(result.rows[0]);
      } else {
        res.status(404).send('List item not found or user not authorized to update the item.');
      }
    })
    .catch((err) => {
      console.error('Error executing UPDATE list item query', err);
      console.error('Error details', {
        body: req.body,
        userId: req.user.id,
        params: req.params,
      });
      res.status(500).send('Server error while updating list item');
    });
});



/**
 * DELETE route template
 */
router.delete('/:id', rejectUnauthenticated, (req, res) => {
  const queryText = 'DELETE FROM list WHERE id = $1 AND user_id = $2';
  const queryValues = [req.params.id, req.user.id];

  pool.query(queryText, queryValues)
    .then((result) => {
      if (result.rowCount > 0) {
        res.sendStatus(204); // No Content response
      } else {
        res.status(404).send('Item not found or user unauthorized to delete the item');
      }
    })
    .catch((err) => {
      console.error('Error deleting list item:', err);
      res.sendStatus(500);
    });
});





module.exports = router;