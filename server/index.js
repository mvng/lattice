const express = require('express');
const path = require('path');
const app = express();
const request = require('request');
const qs = require('querystrings')
const DB_API = 'https://api.themoviedb.org/3';
const API = '5b19221d20b929615d236692cea743e4';
const LANGUAGE = 'en-U&S';
const cache = {
  popular: null,
  homepageLinks: {},
  query: {}
};



app.use(express.static(path.join(__dirname, 'build')));

app.get('/api/movie/popular', function (req, res) {
  //gets any popular movie 
  if (cache.popular) {
    res.send(cache.popular);
  } else {
    const url = `${DB_API}/movie/popular?${qs.stringify({api_key: API,language: LANGUAGE})}`;
    request(url, function (error, response, body) {
      body = JSON.parse(body);
      cache.popular = body;
      res.json(cache.popular);
    });
  }

});

app.get('/api/homepage/:id', function (req, res) {
  let id = req.params.id;
  if (cache.homepageLinks[id]) {
    res.send(cache.homepageLinks[id]);
  } else {
    const url = `${DB_API}/movie/${id}?${qs.stringify({api_key: API, language: LANGUAGE})}`;
    request(url, function (error, response, body) {
      let homepage = JSON.parse(body).homepage;
      cache.homepageLinks[id] = { homepage: homepage };
      res.send(cache.homepageLinks[id]);
    });
  }
})

app.get('/api/search/movie/:query', function(req, res) {

  let { query } = req.params;
  if(cache.query[query]) {
    res.send(cache.query[query]);
  } 
  else {
    const url = `${DB_API}/search/movie/?${qs.stringify({ api_key: API, language: LANGUAGE, query: query})}`;
    request(url, function (error, response, body) {
      body = JSON.parse(body);
      cache.query[query] = body.results;
      res.json(cache.query[query]);
    });
  }
})

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 8080);