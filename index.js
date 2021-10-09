//import express from "express"; //ES6 import I learned from developing Augur. Other problems came from using this though so I switched back to CommonJS
//import path from "path";
//import * as path from "node:path";
const express = require('express');
const path = require('path');
const employees = require('./data/data.json');

const app = express();

//Create a route/endpoint
/*
app.get('/', (req,res) => { //GET request
    //res.send("Hello World"); //Easy way to send something to browser
    //res.sendFile("/html/homepage.html"); //Better way: Send whole HTML files!
    res.sendFile(path.join(__dirname, 'html', 'homepage.html')); //Paths are absolute so I will do it the way Brad does with node paths import
});
*/ //Above was still not even the best way to do it

//This is best way
app.use(express.static("html"));


//REST API for fake employees; pretend our website is for a company with 5,000 employees.
    //And for some reason we want to give out the private information of all our employees over an API? lol
        //I guess not all APIs are public, some need keys. May not learn in this exploration though
//Local json file dataset generated from https://randomuser.me/api/)
//Get all employees from the company
app.get('/api/employees', (req, res) => {
    //Test with random user generator? https://randomuser.me/
    //var data = get("https://randomuser.me/api/?format=json&noinfo");
    //var data = get("https://randomuser.me/api/");
    //randomuser API is not returning json data I want for some reason. Grabbing JSON data to keep local instead.
    res.json(employees.results);
});
//Get employee by id
/*
app.get('/api/employees/:id', (req, res) => {
    res.json(Object.values(employees.results).filter(employee => {
        return employee[req.params.id];
    }));
});
*/

//Get employee(s) by first name
//Took me forever to get working but I learned a lot about JavaScript array filter method to parse JSON!
app.get('/api/employees/:fname', (req, res) => {
    console.log(`Finding ${req.params.fname}`);
    res.json(Object.values(employees.results).filter(employee => employee.name.first === req.params.fname));
});

const PORT = process.env.PORT || 5000; //Source: https://youtu.be/L72fhGm1tfE?t=845
//const PORT = 8000;

app.listen(PORT, () => {
    console.log(`Server running on localhost:${PORT}`);
});