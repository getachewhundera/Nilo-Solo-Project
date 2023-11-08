const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();
const aws = require('aws-sdk');



const {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} = require('@aws-sdk/client-s3');


const s3Client = new S3Client({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});



/**
 * GET route template
 */

router.get('/', async (req, res) => {
  try {
    const queryText = `SELECT * FROM uploadPost`;
    const result = await pool.query(queryText);
    res.send(result.rows);
  } catch (err) {
    console.error('Error completing SELECT uploadPost query', err.stack);
    res.sendStatus(500);
  }
});


/**
 * POST route template
 */
// router.post('/image', async (req, res) => {
//   try {
//     const { imageName } = req.query;
//     const imageData = req.files.image.data;
//     const command = new PutObjectCommand({
//       Bucket: 'prime-nilo-project',
//       Key: `images/${req.user.id}/${imageName}`, //folder file
//       Body: imageData, //image data to upload 
//     })
//     const uploadedFile = await s3Client.send(command);
//     //Thi is the URL the file can be accessed at 
//     //if the read is not public it is not just a url that is going to be sent back 
//     console.log(uploadedFile);

//     res.send({ file_url: `https://prime-nilo-project.s3.us-east-2.amazonaws.com/images/${req.user.id}/${imageName}` });
//   } catch (error) {
//     console.log(error)
//     res.sendStatus(500);
//   }

// });


router.post('/image', async (req, res) => {
  try {
    const { imageName } = req.query;
    const imageData = req.files.image.data;
    const command = new PutObjectCommand({
      Bucket: 'prime-nilo-project',
      Key: `images/${req.user.id}/${imageName}`,
      Body: imageData,
    });

    await s3Client.send(command);

    const fileUrl = `https://prime-nilo-project.s3.us-east-2.amazonaws.com/images/${req.user.id}/${imageName}`;
    res.send({ file_url: fileUrl });
  } catch (error) {
    console.error('Error uploading to S3:', error);
    res.sendStatus(500);
  }
});








router.post('/', async (req, res) => {
  try {
    const newUpload = { ...req.body };
    newUpload.file_url = newUpload.file_url?.toLowerCase().replace(/\s+/g, '');

    const queryText = `INSERT INTO uploadpost (user_id, file_url, description, city, state, country, price, rating)
                        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                        RETURNING *`;
    const queryValues = [
      req.user.id,
      newUpload.file_url,
      newUpload.description,
      newUpload.city,
      newUpload.state,
      newUpload.country,
      newUpload.price,
      newUpload.rating,     
    ];

    const result = await pool.query(queryText, queryValues);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error inserting into database:', err);
    res.sendStatus(500);
  }
});















// router.post('/', async, (req, res) => {
//   console.log('formdata payload made it to router', req.body);
//   const newUpload = { ...req.body }; //create shallow copy of req.body(avoids modifying req.body)
//   // const newUpload = req.body;
//   console.log(newUpload);

//    // Standardize the format of the file URL
//   //  newUpload.file_url = newUpload.file_url.toLowerCase().replace(/\s+/g, '');

//   const queryText = `INSERT INTO uploadpost ("file_url", "description", "house_number", "street_address", "zip_code" , "city" , "state", "country",
//   "price", "rating", "individual_selection", "user_id")
//                       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
//                       RETURNING *`;
//   const queryValues = [
//     newUpload.file_url,
//     newUpload.description,
//     newUpload.house_number,
//     newUpload.street_address,
//     newUpload.zip_code,
//     newUpload.city,
//     newUpload.state,
//     newUpload.country,
//     newUpload.price,
//     newUpload.rating,
//     newUpload.individual_selection, 
//     req.user.id, 
//   ];
//   pool.query(queryText, queryValues)
//     .then((result) => {
//       res.status(200).send(result.rows[0]);
//       // res.status(201).json(result.rows[0]);
//     })
//     .catch((err) => {
//       console.error('Error completing Insert uploadPost query', err.stack);
//       res.sendStatus(500);
//     });
// });

/**
 * DELETE route template
 */

router.delete('/:id', rejectUnauthenticated, (req, res) => {
  const postId = req.params.id;
  const queryText = 'DELETE FROM uploadpost WHERE id = $1';
  pool.query(queryText, [postId])
    .then(() => {
      res.sendStatus(204); // No Content, successful deletion
    })
    .catch((err) => {
      console.error('Error completing DELETE uploadPost query', err.stack);
      res.sendStatus(500);
    });
});


module.exports = router;
