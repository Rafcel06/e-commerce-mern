const express = require('express')
const router = express.Router()
const db = require('../E-commerce/Database')
const path = require('path')



const currentDirectory = __dirname;
const directoryName = path.basename(currentDirectory);


router.get('/all-orders/:id', async (req,res) => {

  const id = req.params.id

    try {
    const orders = await db.executeQuery(`SELECT * FROM ${directoryName} INNER JOIN products ON orders.product_id = products.id WHERE user_id = ${id ? id : null}`)
    res.status(200).json(orders)
    }
    catch (err) {
    res.status(500).json({ error: 'Internal server error' });
    }
})

router.post('/create-order' , async (req,res) => {
  const {user_id,payment_method,total_amount,quantity,shipping_address,billing_address, product_id} = req.body
   try {
    const sql = `INSERT INTO ${directoryName} (user_id,payment_method,total_amount,quantity,shipping_address,billing_address,product_id) VALUES(?,?,?,?,?,?,?) `
    const results = await db.insertQuery(sql,[user_id,payment_method,total_amount,quantity,shipping_address,billing_address, product_id]) 
    res.status(201).json({meesage:'Succesfully created', Order: req.body})
   }

   catch(err)  {
    res.status(500).json({ error: 'Internal server error' });
   }

})




module.exports = router

