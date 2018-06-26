const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
const request = require('request');
const DB_API = 'https://api.themoviedb.org/3';
const API = '5b19221d20b929615d236692cea743e4';

app.use(express.static(path.join(__dirname, 'build')));

app.get('/api/movie/popular', function (req, res) {
  
  request(DB_API + '/movie/popular?api_key='+API+'&language=en-US', function(error, response, body) {
    res.send(body);
  });

});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 8080);