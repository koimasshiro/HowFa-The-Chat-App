const express = require('express');
const dotenv = require('dotenv');
const { chats } = require('./Data/data');


const app = express();
dotenv.config();

app.get('/', (req, res)=>{
    res.send('Yaay! API is running');
});

app.get('/api/chats', (req,res)=>{
    res.send(chats)
});

app.get('/api/chats/:id', (req,res)=>{
    // console.log(req.params.id);
    const findSingleChat = chats.find(c=> c._id === req.params.id);
    res.send(findSingleChat);
});

const PORT = process.env.PORT || 5000;


app.listen(PORT,  console.log(`Server running on port:${PORT}`));