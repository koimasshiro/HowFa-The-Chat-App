const express = require('express');
const dotenv = require('dotenv');
const { chats } = require('./Data/data');
const connectDB = require('./Database/db');
const colors = require('colors')

const app = express();
dotenv.config();

connectDB();

app.get('/', (req, res)=>{
    res.send('Yaay! API is running');
});

app.use('/api/user', userRoute);

const PORT = process.env.PORT || 5000;


app.listen(PORT,  console.log(`Server running on port:${PORT}` .yellow.bold.underline));