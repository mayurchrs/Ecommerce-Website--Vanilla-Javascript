import express from 'express';
import cors from 'cors';
import data from './data.js';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import config from './config.js';
import userRouter from './routers/userRouter.js';
import orderRouter from './routers/orderRouter.js';


mongoose.connect(config.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then( () => {
    console.log('Connected to mongodb.'); //check that we have successfully connected with mongo or not
  })
  .catch((error) => {
    console.log(error.reason);
  });

const app = express(); //running express function and this function returns object which is our web app
app.use(cors()); //by having this configuration we are sending request from different url to our address localhost:5000/api/products

app.use(bodyParser.json());
app.use('/api/users',userRouter);
app.use('/api/orders', orderRouter);

app.get('/api/paypal/clientId', (req, res) => {
  res.send({clientId: config.PAYPAL_CLIENT_ID});
})
app.get("/api/products", (req, res) => {

    res.send(data.products);      //sending data to the client and the data is products data
});

app.get('/api/products/:id', (req, res) => {
    const product = data.products.find((x) => x._id === req.params.id);

    if(product){
        res.send(product);
    }
    else{
        res.status(404).send({message: 'Product Not Found!'});
    }
});



app.use((err, req, res, next) => {
    const status = err.name && err.name === 'ValidationError' ? 400 : 500;
    res.status(status).send({ message: err.message });
  });

//below function is used for running our server
app.listen(5000, () => {
    console.log('serve at http://localhost:5000');
});

// const express = require("express"); //get access to the express pkg
// const cors = require('cors');
// const data = require('./data.js');

//app.get--> to create a route by using app and get is http verb and inside this function we are going to return array that we have
//in data.js

//from above all code we are able to make a web server
