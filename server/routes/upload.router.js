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
  console.log('formdata payload made it to router' , req.body); 
  const newUpload = req.body;
  const queryText = `INSERT INTO uploadpost ("file_url", "description", "house_number", "street_address", "zip_code" , "city" , "state", "country", 
    "latitude", "longitude", "price", "rating", "individual_selection")
                      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
                      RETURNING *`;
  const queryValues = [
    newUpload.file_url,
    newUpload.description,
    newUpload.house_number,
    newUpload.street_address,
    newUpload.zip_code,
    newUpload.city,
    newUpload.state,
    newUpload.country,
    newUpload.latitude,
    newUpload.longitude,
    newUpload.price,
    newUpload.rating,
    newUpload.individual_selection,
  ];
  pool.query(queryText, queryValues)
  .then((result) => { 
    res.status(201).json(result.rows[0]); 
  })
  .catch((err) => {
    console.error('Error completing Insert uploadPost query', err.stack);
    res.sendStatus(500);
  });
});


module.exports = router;
