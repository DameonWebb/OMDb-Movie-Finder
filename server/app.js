//create a server using express framework
//instruct Node to include Morgan in your app
//log all incoming requests with the morgan logging library
const express = require('express');
const morgan = require('morgan');
const app = express('express');
const axios = require('axios');
const { query } = require('express');

require('dotenv').config()
//console.log(process.env)

app.use(morgan('tiny'));

var movies=[];


//...

app.get('/', function(req,res) {
  
  // /?i=tt3896198
  if(req.url[2] == "i") {
    for(i = 0; i < movies.length; i++) {
      if(movies[i]["imdbID"]===req.query["i"]) {
        console.log("movie from cache",movies);
        res.send(movies[i]);
        return
      }
    } 
    axios.get(`http://www.omdbapi.com${req.url}&apikey=${process.env.API_KEY}`)
    .then(function (response) {
      // handle success
      console.log(response.data);
      res.send(response.data);
      movies.push(response.data);
      console.log("movie from axios call",movies);
      return
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
    
  }
  // /?i=tt3896198
  if(req.url[2] == "t") {
    for(i = 0; i < movies.length; i++) {
      console.log("line 52", movies[i]["Title"].toLowerCase(), req.query["t"])
      if(movies[i]["Title"].toLowerCase() === req.query["t"]) {
        console.log("movie from cache",movies);

        res.send(movies[i]);
        return
      }
    } 
    axios.get(`http://www.omdbapi.com${req.url}&apikey=${process.env.API_KEY}`)
    .then(function (response) {
      // handle success
      console.log(response.data);
      res.send(response.data);
      movies.push(response.data);
      console.log("movie from axios call",movies);
      return

    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    }); 
  }
//axios GET requests
console.log(req.url)
console.log(req.query)

/*axios.get(`http://www.omdbapi.com${req.url}&apikey=${process.env.API_KEY}`)
  .then(function (response) {
    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  }); */

}) 

// When making calls to the OMDB API make sure to append the '&apikey=8730e0e' parameter
module.exports = app;