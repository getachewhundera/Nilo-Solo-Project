const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const cloudinaryUpload = require('../modules/cloudinary-config');


router.get('/', (req, res) => {
  const sqlText = `
    SELECT * FROM image
      WHERE owner_id = $1;
  `;
  const sqlValues = [req.user.id];
  pool.query(sqlText, sqlValues)
    .then((dbRes) => {
      res.send(dbRes.rows);
    })
    .catch((dbErr) => {
      console.error('db error in GET /api/images', dbErr)
      res.sendStatus(500);
    })
});


router.post('/', cloudinaryUpload.single('image'), async (req, res) => {
  const imageDescription = req.body.description;
  // after the image uploads, we have access to req.file:
  console.log('nifty! req.file:', req.file)
  const imageUrl = req.file.path;
  const userId = req.user.id;

  const sqlText = `
    INSERT INTO "image"
      ("description", "image_path", "owner_id")
      VALUES
      ($1, $2, $3);
  `;
  const sqlValues = [imageDescription, imageUrl, userId];

  pool.query(sqlText, sqlValues)
    .then((dbRes) => {
      res.sendStatus(201);
    })
    .catch((dbErr) => {
      console.error('db error in POST /api/images', dbErr)
      res.sendStatus(500);
    })
});

module.exports = router;
