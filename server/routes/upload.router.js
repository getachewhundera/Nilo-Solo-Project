const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
// brought in aws 
const aws = require('aws-sdk');


// const {
//   GetObjectCommand,
//   PutObjectCommand,
//   S3Client,
// } = require('@aws-sdk/client-s3');

//different from code down below 
// const s3Client = new aws.S3({
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//     region: process.env.AWS_REGION,
// });

const s3Client = new s3Client({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});


/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
});

/**
 * POST route template
 */

//POST route code for fileUpload
router.post('/image', async (req, res) => {
  try {
    const { imageName } = req.query;
    const { imageData } = req.files.image.data;

    const uploadedFile = await s3Client.upload({
      Bucket: 'prime-nilo-project',
      Key: `images/${imageName}`, //folder file
      Body: imageData, //image data to upload 
      // ACL: 'public-read'   //might not be needed 
    });
    //Thi is the URL the file can be accessed at 
    //if the read is not public it is not just a url that is going to be sent back 
    console.log(uploadedFile.Location);


    //TODO: insert the URL into the database 

    // send OK  back to client 
    res.sendStatus(201);
  } catch (error) {
    console.log(error)
    res.sendStatus(500);
  }

});

router.post('/', (req, res) => {
  console.log('formdata payload made it to router', req.body);
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
