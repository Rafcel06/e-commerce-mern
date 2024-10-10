const express = require("express");
const session = require('express-session');
const bcryptjs = require("bcryptjs");
const router = express.Router();
const jwt = require("jsonwebtoken");
const auth = require("../Authorization/gaurd")
const db = require('../E-commerce/Database')
const { rateLimit }  = require('express-rate-limit')
const path = require('path');
const multer = require('multer')
const nodemailer = require('nodemailer')
require('dotenv').config()

 const transporter = nodemailer.createTransport({
    service:'gmail',
    auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PASSWORD
    }
  })



const currentDirectory = __dirname;
const directoryName = path.basename(currentDirectory);



router.use(session({
    secret: process.env.AUTHENTICATED_SECRET_KEY,
    saveUninitialized: true,
    resave: false,
    cookie: {
      maxAge: 6000000,
    },
}))


const limiter = rateLimit({
	windowMs: 60 * 60 * 1000, 
	max: 20,
    skipSuccessfulRequests: true, 
    handler : (req,res) => {
         res.status(400).json({message: 'We recieve too many request please try after 15min'});
    }
})

let OTP, userId;


const mailUser = (option,req,res) => {
    
    transporter.sendMail(option, (err,info) => {
 
     if(err) {
         console.log(err)
         res.status(500).json({message:'Failed to send a message'})

         
 
     }
     else {
       
        token = jwt.sign({email:req.body.email}, process.env.CONFIRM_SECRET_KEY, {expiresIn:'1hr'})

         res.status(201).json({token,userId:req.body.id})
         // UI will send to confirm account
   
     }
   })
 }
 


router.post('/forgot-password', async(req,res) => {

    const option = {
    from: 'E-commerce',
    to: req.body.email,
    subject : 'Reset Password',
    html : `Reset your password`,
  
  }

  mailUser(option,req,res)

})




router.post('/login', limiter, async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }
  
    try {
  
        const sql = `SELECT * FROM ${directoryName} WHERE email = ?`;
        const results = await db.executeQuery(sql, [email]);
  
        if (results.length === 0) {
            return res.status(404).json({ message: 'No account found with this email' });
        }
  
        const user = results[0];

        bcryptjs.compare(password, user.password, (err, result) => {
            if (err || !result) {
                return res.status(401).json({ message: 'Password does not match' });
            }
  
            const token = jwt.sign({ email: user.email }, process.env.AUTHENTICATED_SECRET_KEY, { expiresIn: '10hrs' });

            const { password, ...userProfile } = user;
            req.session.user = userProfile

            

            req.session.authenticated = true

            res.status(200).json({session:req.session.user,token});
        });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
  });



  router.post('/register', async (req, res) => {
    const { firstName, middleName, lastName, phone, email, password } = req.body;
  
    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }
  
    try {
        const hashedPassword = await bcryptjs.hash(password, 10);
        const sql = `INSERT INTO ${directoryName} (firstName, lastName, email, password, verified) VALUES (?, ?, ?, ?, ?)`;
        const result = await db.insertQuery(sql, [firstName, lastName, email, hashedPassword, false]); // Set verified to false
  
        const option = {
          from: 'E-commerce',
          to: req.body.email,
          subject: 'Verify',
          html: `<!DOCTYPE html>
                  <html lang="en">
                  <head>
                  <meta charset="UTF-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <title>Verify Email</title>
                <style>
                   body {
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      height: 100vh;
                      background-color: #f0f0f0;
                      font-family: Arial, sans-serif;
                  } 
                 .card {
                     background: white;
                     border-radius: 10px;
                     box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
                     padding: 30px;
                     width: 350px;
                     text-align: left;
                     padding: 2em 0;
                  }
                 h2 {
                    color: #61d2ff; /* Festival color */
                    margin-bottom: 10px;
                 }
                 .greeting {
                    font-size: 18px;
                    color: #4a4a4a;
                    margin-bottom: 20px;
                    font-weight: 600;
                }
                p {
                   color: #555;
                   margin-bottom: 20px;
                  }
                .verify-btn {
                  background: linear-gradient(45deg, #40b9ff, #406dff); /* Festive gradient */
                  color: white;
                  border: none;
                  border-radius: 5px;
                  padding: 12px 20px;
                  cursor: pointer;
                  font-weight: bold;
                  transition: background 0.3s;
                  width: 50%;
                }
              .verify-btn:hover {
                opacity: 0.9;
                }
            </style>
                  </head>
                  <body>
                    <div class="card">
                      <div class="greeting">Hello ${firstName}!</div>
                      <h2>Verify Your Email</h2>
                      <p>Please click the button below to activate your account.</p>
                      <a class="verify-btn" href="${process.env.SERVER_URL}/auth/verify/${result.insertId}">Verify Email</a>
                    </div>
                  </body>
                  </html>`,
        };
  
        mailUser(option, req, res);
        res.status(201).json({ user: req.body });
    } catch (error) {
        console.error('Error registering User:', error);
        res.status(500).json({ error: 'Failed to register User' });
    }
  });
  



  router.post('/register', async (req, res) => {
    const { firstName, middleName, lastName, phone, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const hashedPassword = await bcryptjs.hash(password, 10);
        const sql = `INSERT INTO ${directoryName} (firstName, lastName, email, password, verified) VALUES (?, ?, ?, ?, ?)`;
        const result = await db.insertQuery(sql, [firstName, lastName, email, hashedPassword, false]); 

        const userId = result.insertId; 

        const option = {
            from: 'E-commerce',
            to: req.body.email,
            subject: 'Verify',
            html: `<!DOCTYPE html>
                    <html lang="en">
                    <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Verify Email</title>
                    <style>
                        body {
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            height: 100vh;
                            background-color: #f0f0f0;
                            font-family: Arial, sans-serif;
                        } 
                        .card {
                            background: white;
                            border-radius: 10px;
                            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
                            padding: 30px;
                            width: 350px;
                            text-align: left;
                            padding: 2em 0;
                        }
                        h2 {
                            color: #61d2ff;
                            margin-bottom: 10px;
                        }
                        .greeting {
                            font-size: 18px;
                            color: #4a4a4a;
                            margin-bottom: 20px;
                            font-weight: 600;
                        }
                        p {
                            color: #555;
                            margin-bottom: 20px;
                        }
                        .verify-btn {
                            background: linear-gradient(45deg, #40b9ff, #406dff);
                            color: white;
                            border: none;
                            border-radius: 5px;
                            padding: 12px 20px;
                            cursor: pointer;
                            font-weight: bold;
                            transition: background 0.3s;
                            width: 50%;
                        }
                        .verify-btn:hover {
                            opacity: 0.9;
                        }
                    </style>
                 </head>
                 <body>
                    <div class="card">
                        <div class="greeting">Hello ${firstName}!</div>
                        <h2>Verify Your Email</h2>
                        <p>Please click the button to verify your account.</p>
                        <button class="verify-btn" onclick="verifyEmail()">Verify Email</button>
                    </div>
                    <script>
                        function verifyEmail() {
                            fetch('${process.env.SERVER_URL}/api/auth/update-profile/${userId}', {
                                method: 'PUT',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({ verified: 1 }),
                            })
                            .then((response) => {
                                if (!response.ok) {
                                    console.log("Something went wrong");
                                    return; // Exit if response is not ok
                                }
                                return response.json(); 
                            })
                            .then((res) => console.log(res)) 
                            .catch((err) => console.log(err)); 
                        }
                    </script>
                 </body>
                 </html>`,
        }

   
        mailUser(option, req, res, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                return res.status(500).json({ error: 'Failed to send email' });
            }
            res.status(201).json({ user: req.body, message: 'Registration successful, please verify your email.' });
        });
    } catch (error) {
        console.error('Error registering User:', error);
        res.status(500).json({ error: 'Failed to register User' });
    }
});

  

router.put('/update-profile/:id', async (req, res) => {
    const id = req.params.id;
    const { firstName, middleName, lastName, phone, email, password, emergencyPhoneNumber, currentAddress, permanentAddress, verified } = req.body;

    if (!id) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    try {
        let sql = `UPDATE ${directoryName} SET`;
        const values = [];

        if (password) {
            const hashedPassword = await bcryptjs.hash(password, 10);
            sql += ' password = ?,';
            values.push(hashedPassword);
        }

        if (firstName) {
            sql += ' firstName = ?,';
            values.push(firstName);
        }

        if (middleName) {
            sql += ' middleName = ?,';
            values.push(middleName);
        }

        if (lastName) {
            sql += ' lastName = ?,';
            values.push(lastName);
        }

        if (phone) {
            sql += ' phone = ?,';
            values.push(phone);
        }

        if (email) {
            sql += ' email = ?,';
            values.push(email);
        }

        if (emergencyPhoneNumber) {
            sql += ' emergencyPhoneNumber = ?,';
            values.push(emergencyPhoneNumber);
        }

        if (currentAddress) {
            sql += ' currentAddress = ?,';
            values.push(currentAddress);
        }

        if (permanentAddress) {
            sql += ' permanentAddress = ?,';
            values.push(permanentAddress);
        }

        if (verified !== undefined) { 
            sql += ' verified = ?,';
            values.push(verified);
        }


        sql = sql.slice(0, -1);
        sql += ' WHERE id = ?';
        values.push(id);

        const result = await db.executeQuery(sql, values);

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'User profile updated successfully' });
        } else {
            res.status(404).json({ message: 'User not found or no changes made' });
        }
    } catch (error) {
        console.error('Error updating user profile:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});




router.delete('/delete-profile/:id', auth, async (req, res) => {
  const id = req.params.id;

  if (!id) {
      return res.status(400).json({ message: 'User ID is required' });
  }

  try {
      const sql = `DELETE FROM ${directoryName} WHERE id = ?`;
      const result = await db.executeQuery(sql, [id]);

      if (result.affectedRows > 0) {
          res.status(200).json({ message: 'User profile deleted successfully' });
      } else {
          res.status(404).json({ message: 'User not found' });
      }
  } catch (error) {
      console.error('Error deleting user profile:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
});





router.get('/all-profile', async (req, res) => {
    try{
        const users = await db.executeQuery(`SELECT id,firstName,lastName,phone,email FROM ${directoryName}`);
        res.status(200).json({users});
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal server error' });
        throw new Error()
    }
  });






  module.exports = router 
  