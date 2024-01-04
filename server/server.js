const express = require('express');
const dotenv = require('dotenv');
const { chats } = require('./Data/data');
const connectDB = require('./Config/db');
const colors = require('colors');
const cors = require('cors');
const userRoute = require('./Routes/userRoute');
const chatRoute = require('./Routes/chatRoute');
const { errorHandler, notFound } = require('./Middlewares/errorHandler');

const app = express();
dotenv.config();

connectDB();

// Enable CORS
app.use(cors());

//allow app to accept JSON data
app.use(express.json());

app.get('/', (req, res)=>{
    res.send('Yaay! API is running');
});

app.use('/api/user', userRoute);
app.use('/api/chats', chatRoute);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;


app.listen(PORT,  console.log(`Server running on port:${PORT}` .yellow.bold.underline));