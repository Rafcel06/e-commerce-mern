const express = require('express');
const router = express.Router();
const db = require('../E-commerce/Database');
const path = require('path');

const currentDirectory = __dirname;
const directoryName = path.basename(currentDirectory);


router.get('/all-categories', async (req, res) => {
    try {
    
        const products = await db.executeQuery(`SELECT * FROM ${directoryName}`);
        res.status(200).json(products);
    } catch (err) {
        console.error('Error fetching categories:', err); 
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;

