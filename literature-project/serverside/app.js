const express = require('express');
const app = express();
const bodyParser  = require('body-parser');
const request = require('request');
const axios = require('axios');


app.get('/test', (req, res, next) => {
    //we will add an array named students to pretend that we received this data from the database
    const students = [ 
    { "id" : "1", "firstName" : "John" , "lastName" : "Dow" }, 
    { "id" : "2", "firstName" : "Ann" , "lastName" : "Smith" }, 
    { "id" : "3", "firstName" : "Joan" , "lastName" : "Doe" }];
    //send the array as the response 
    res.json(students);

});

app.get('/people', function (req, res) {
    res.send('hello');
})

module.exports=app;