const express = require('express');
const path = require('path');
// const fs = require('fs');
const app = express();
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const { runInNewContext } = require('vm');
mongoose.connect('mongodb://localhost/contactDance')
const port = 8000;

// Define Mongo Scema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
  });

  const Contact = mongoose.model('Kitten', contactSchema);


app.use('/static', express.static('static'));
app.use(express.urlencoded())

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res)=>{
    const params= {}
    res.render('home', params)
})
app.get('/contact', (req, res)=>{
    const params= {}
    res.render('contact', params)
})


// POST Request on contact

app.post('/contact', (req, res)=>{
    const myData = new Contact(req.body)
    myData.save().then(()=>{
        res.send('this data has been save to the database')
    }).catch(()=>{
        res.status(400).send('Item was not send to the dataBase')
    });
    // res.render('contact'node)
})



app.listen(port, ()=>{
    console.log(`This app is successfully run on the prot ${port}`);
})