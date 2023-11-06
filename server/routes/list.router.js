const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
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

router.get('/completed', rejectUnauthenticated, (req, res) => {
  const userId = req.user.id;
  const queryText = 'SELECT * FROM list WHERE user_id = $1 AND is_completed = TRUE';
  const queryValues = [userId]
  pool.query(queryText, queryValues)
    .then((result) => { res.send(result.rows) })
    .catch((err) => {
      console.log('Error completing SELECT list query', err);
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
  const queryText = 'UPDATE list SET is_completed = NOT is_completed WHERE id = $1 AND user_id = $2 RETURNING *';
  const queryValues = [req.params.id, req.user.id];

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
  const isCompleted = req.query.isCompleted === 'true';
  const queryText = 'DELETE FROM list WHERE id = $1 AND is_completed = $2';
  const queryValues = [req.params.id, isCompleted];

  pool.query(queryText, queryValues)
    .then((result) => {
      if (result.rowCount > 0) {
        res.send('List item deleted');
      } else {
        res.status(400).send('Item does not exist');
      }
    })
    .catch((err) => {
      console.error('Error deleting list item:', err);
      res.status(500).send('Server Error');
    });
});

router.delete('/:id', (req, res) => {
  const queryText = 'DELETE FROM list WHERE id = $1';
  // const queryText = 'DELETE FROM list WHERE id = $1 AND is_completed = false';
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



module.exports = router;