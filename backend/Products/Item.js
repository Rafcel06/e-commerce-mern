const express = require('express')
const router = express.Router()
const db = require('../E-commerce/Database')
const path = require('path')



const currentDirectory = __dirname;
const directoryName = path.basename(currentDirectory);


router.get('/single-product/:id', async (req,res) => {

    const id = req.params.id

    try {
    const products = await db.executeQuery(`SELECT * FROM ${directoryName} WHERE id = ${id}`)
    res.status(200).json(products)
    }
    catch (err) {
    res.status(500).json({ error: 'Internal server error' });
    }
})


router.get('/all-products', async (req,res) => {


    try {
    const products = await db.executeQuery(`SELECT * FROM ${directoryName}`)
    res.status(200).json(products)
    }
    catch (err) {
    res.status(500).json({ error: 'Internal server error' });
    }
})



router.put('/update-product/:id', async (req, res) => {
    const id = req.params.id;
    const { stock_quantity } = req.body;

    if (stock_quantity === undefined) {
        return res.status(400).json({ message: 'Quantity field is required' });
    }

    try {


        sql = `UPDATE ${directoryName} SET stock_quantity = stock_quantity - ? WHERE id = ?`;
        const values = [stock_quantity, id];

        const result = await db.executeQuery(sql, values);

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'stock_quantity updated successfully' });
        } else {
            res.status(404).json({ message: 'field not found or no changes made' });
        }
    } catch (error) {
        console.error('Error updating stock_quantity :', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


module.exports = router

