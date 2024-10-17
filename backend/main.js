const express = require('express')
const cors = require('cors')
require('dotenv').config()
const path = require('path')
const Authenticate = require('./Users/Authentication')
const Item  = require('./Products/Item')
const Category = require('./Categories/Category')
const Review = require('./Reviews/Review')
const Order = require('./Orders/order')
const Address = require('./Address/address')
const Shoppingcart = require('./Shoppingcarts/shoppingcart')


const PORT = process.env.PORT || 4002
const app = express()



app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

app.use('/assets/file', express.static('File/Assets'))
app.use(express.static(path.join(__dirname,'public')))

app.use('/api/auth', Authenticate)
app.use('/api/category', Category)
app.use('/api/product', Item)
app.use('/api/review', Review)
app.use('/api/order', Order)
app.use('/api/address', Address)
app.use('/api/cart', Shoppingcart)




if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
    )
  );
} else {
  app.get('/', (req, res) => res.send('Please set to production'));
}



app.listen(PORT, () => {
    console.log(`Server listen in ${PORT}`)
})

// Done for Now