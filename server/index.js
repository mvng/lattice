const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
const request = require('request');
const DB_API = 'https://api.themoviedb.org/3';
const API = '5b19221d20b929615d236692cea743e4';
const LANGUAGE = 'en-U&S'
const cache = {
  popular: null,
  homepageLinks: {}
};

app.use(express.static(path.join(__dirname, 'build')));

app.get('/api/movie/popular', function (req, res) {
  //gets any popular movie 

  if (cache.popular) {
    res.send(cache.popular);
  } else {
    request(DB_API + '/movie/popular?api_key=' + API + '&language='+LANGUAGE, function (error, response, body) {
      body = JSON.parse(body);
      cache.popular = body;
      res.json(body);
    });
  }

});

app.get('/api/homepage/:id', function (req, res) {
  let id = req.params.id;
  if (cache.homepageLinks[id]) {
    res.send(cache.homepageLinks[id]);
  } else {
    request(DB_API + "/movie/" + id + "?api_key=" + API + '&language=' + LANGUAGE, function (error, response, body) {
      let homepage = JSON.parse(body).homepage;
      cache.homepageLinks[id] = { homepage: homepage };
      res.send(cache.homepageLinks[id]);
    });
  }
})

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 8080);