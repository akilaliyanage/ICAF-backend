const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv/config')

//Import Routes
const navBarRoutes = require('./routes/NavBarItemRoutes')

//Middleware
app.use('/nav-items',navBarRoutes);



//connecting to the database
mongoose.connect(
    process.env.DB_CONNECTION,
    {useNewUrlParser: true , useUnifiedTopology:true},
    () =>{
        console.log("connected to the database")
    }
)

//server start
app.listen(8000);