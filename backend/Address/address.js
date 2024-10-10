const express = require('express')
const router = express.Router()
const db = require('../E-commerce/Database')
const path = require('path')



const currentDirectory = __dirname;
const directoryName = path.basename(currentDirectory);


router.get('/all-address/:id', async (req,res) => {
    
    const id = req.params.id

    try {
    const address = await db.executeQuery(`SELECT * FROM ${directoryName} WHERE ${id}`)
    res.status(200).json(address)
    }
    catch (err) {
    res.status(500).json({ error: 'Internal server error' });
    }
})



router.post('/create-address' , async (req,res) => {

    const {user_id,fullName,phone,email,notes,address,city,province,region,barangay} = req.body
     
   try {
    const sql = `INSERT INTO ${directoryName} (user_id, fullName, phone, email,notes, address,city,province,region,barangay) VALUES(?,?,?,?,?,?,?,?,?,?) `
    const results = await db.insertQuery(sql,[user_id,fullName,phone,email,notes,address,city,province,region,barangay]) 
    res.status(201).json({meesage:'Succesfully created', Address: req.body})
   }

   catch(err)  {
    res.status(500).json({ error: 'Internal server error' });
   }

})



router.put('/update-address/:id', async (req, res) => {
    const id = req.params.id;
    const { active } = req.body;

    if (active === undefined) {
        return res.status(400).json({ message: 'Active field is required' });
    }

    try {

        let sql = `UPDATE ${directoryName} SET active = false`;
        await db.executeQuery(sql);


        sql = `UPDATE ${directoryName} SET active = ? WHERE id = ?`;
        const values = [active, id];

        const result = await db.executeQuery(sql, values);

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Address active status updated successfully' });
        } else {
            res.status(404).json({ message: 'Address not found or no changes made' });
        }
    } catch (error) {
        console.error('Error updating Address active status:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});







module.exports = router