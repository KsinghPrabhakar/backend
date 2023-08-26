const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
const Product = require('./models/productModel')

const app = express()
app.use(express.json())
app.use(cors())

// Server connection
app.listen(3000, ()=>  {
    console.log(`Server is runing on port 3000`)
})
// DB connection
mongoose.connect("mongodb+srv://prabhakar:Prabhakar123@cluster0.ol2vqan.mongodb.net/?retryWrites=true&w=majority")
.then(()=>{
    console.log("Database connected successfully.")
})
.catch((error)=>{
    console.log(error.message)
})


// Routes endpoints
app.post('/products', async(req, res) => {
  try {
    const products = await Product.create(req.body)
    res.status(200).json({products})
  } catch (error) {
    console.log(error.message)
    res.status(500).json({message: error.message})
  }
});
// Get all data
app.get('/products', async(req, res) => {
    try {
        const products = await Product.find({})
        res.status(200).json({products})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})
// Get data by id
app.get('/products/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findById(id)
        res.status(200).json({product})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})
// Edit data by id
app.put('/products/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body)
        if(!product){
            return res.status(404).json({message: `Can't find any product by id ${id}`})
        }
        const updatedProduct = await Product.findById(id)
        res.status(200).json(updatedProduct)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})
// Delete data by id
app.delete('/products/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id, req.body)
        if(!product){
            return res.status(404).json({message: `Can't find any product by id ${id}`})
        }
        res.status(200).json({message: "Product has been deleted successfully."})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})
