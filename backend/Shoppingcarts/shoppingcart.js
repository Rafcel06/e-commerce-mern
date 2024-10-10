const express = require('express');
const router = express.Router();
const db = require('../E-commerce/Database');
const path = require('path');

const currentDirectory = __dirname;
const directoryName = path.basename(currentDirectory);


router.get('/all-cart/:id', async (req, res) => {

    const id = req.params.id

    try {
    
        const shoppingcart = await db.executeQuery(`SELECT ${directoryName}.id AS cart_id, ${directoryName}.quantity, users.id AS user_id, products.id AS product_id, products.name AS product_name, products.price, products.image_url, 
        products.sale_price, products.stock_quantity
        FROM  ${directoryName} 
        INNER JOIN 
        users ON ${directoryName}.user_id = users.id 
        INNER JOIN 
        products ON products.id = ${directoryName}.product_id WHERE user_id = ${id}; `);
        res.status(200).json(shoppingcart);
    } catch (err) {
        console.error('Error fetching shopping cart:', err); 
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/create-cart' , async (req,res) => {

    const {user_id,product_id} = req.body
     try {
      const sql = `INSERT INTO ${directoryName} (user_id,product_id) VALUES(?,?) `
      const cart = await db.insertQuery(sql,[user_id, product_id]) 
      res.status(201).json({meesage:'Succesfully created', cart})
     }
  
     catch(err)  {
      res.status(500).json({ error: 'Internal server error' });
     }
  
  })



  router.put('/update-cart/:id', async (req, res) => {
    const id = req.params.id;
    const { quantity } = req.body;

    if (quantity === undefined) {
        return res.status(400).json({ message: 'Active field is required' });
    }

    try {

        sql = `UPDATE ${directoryName} SET quantity = ? WHERE id = ?`;
        const values = [quantity, id];

        const result = await db.executeQuery(sql, values);

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Cart updated successfully' });
        } else {
            res.status(404).json({ message: 'Cart Item not found or no changes made' });
        }
    } catch (error) {
        console.error('Error updating Cart item:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});



router.delete('/delete-cart/:id', async (req,res) => {
  
    const id = req.params.id

    if(!id) {
        res.status(400).json({message:'Product ID is required'})
    }
 
   try {

     const sql = `DELETE FROM ${directoryName} WHERE ID = ?`
     const result = await db.executeQuery(sql,[id])

     if(result.affectedRows > 0 ) {
          res.status(200).json({message :'Product deleted successfully'})
     } else {
          res.status(400).json({meesage:'Product Not Found'})
     }
        
   }

   catch(err) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Internal server error' });
   }
})


module.exports =  router


