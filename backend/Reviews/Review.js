const express = require('express');
const router = express.Router();
const db = require('../E-commerce/Database');
const path = require('path');
require('dotenv').config()
const currentDirectory = __dirname;
const directoryName = path.basename(currentDirectory);
const multer = require('multer')


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './File/Assets'); 
    },
    filename: (req, file, cb) => {
        const timestamp = Date.now();
        cb(null, `${timestamp} -- ${file.originalname}`);
    }
});

const upload = multer({ storage });


router.get('/all-reviews/:id', async (req, res) => {

    const id = req.params.id

    try {
    
        const reviews = await db.executeQuery(`SELECT reviews.id, reviews.comment, reviews.rating, reviews.created_at, CONCAT(users.firstName, " ", users.lastName) AS fullName FROM ${directoryName} INNER JOIN users ON ${directoryName}.user_id = users.id WHERE product_id = ${id};
`);
        res.status(200).json(reviews);
    } catch (err) {
        console.error('Error fetching categories:', err); 
        res.status(500).json({ error: 'Internal server error' });

    }
});





router.post('/create-reviews', upload.array('files', 12), async (req, res) => {
    const { user_id, product_id, comment } = req.body;
    const file_keys = req.files.map(file => process.env.SERVER_URL + "/" + "assets/" + "file/" + file.filename); 

    try {
       
        const sql = `INSERT INTO reviews (user_id, product_id, comment) VALUES (?, ?, ?)`;
        const result = await db.executeQuery(sql, [user_id, product_id, comment]);
        
        const reviewId = result.insertId; 


        if (file_keys && file_keys.length > 0) {
            const sqlImages = `INSERT INTO review_images (review_id, file_key) VALUES (?, ?)`;
            const promises = file_keys.map(fileKey => 
                db.executeQuery(sqlImages, [reviewId, fileKey])
            );
            await Promise.all(promises);
        }

        res.status(201).json({ message: 'Review created successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/image-reviews', async (req,res) => {
    
  try{
     
    const result = await db.executeQuery('SELECT * FROM review_images')
    res.status(200).json({reviews : result})
  }

  catch (err) {
    res.status(400).json({message:"Internal Server error"})
  }

})




module.exports = router;

