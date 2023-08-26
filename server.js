const express = require('express')
const app = express()
// Routes
app.get('/', (req, res) => {
    res.send("hello")
})
// Server 
app.listen(3000, ()=>  {
    console.log(`Server is runing on port 3000`)
})
console.log('hello')