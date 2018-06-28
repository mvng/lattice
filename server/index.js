const express = require('express');
const path = require('path');
const app = express();
const request = require('request');
const qs = require('querystrings')
const DB_API = 'https://api.themoviedb.org/3';
const API = '5b19221d20b929615d236692cea743e4';
const LANGUAGE = 'en-U&S';

//Caching url here so we dont overload api requests
//also faster querying
//TODO save this in a DB so we dont have to rebuild on restart

const cache = {
  homepageLinks: {},
  popularTime: Date.now()
};

app.use(express.static(path.join(__dirname, 'build')));

app.get('/api/movie/popular', function (req, res) {

    const url = `${DB_API}/movie/popular?${qs.stringify({
      api_key: API,
      language: LANGUAGE,
      page: req.query.page
    })}`;

  console.log(Date.now(), req.url);
  //gets any popular movie 
  if (typeof cache[url] !== "undefined" && cache.popularTime + 900000 > Date.now()) {
    res.send(cache[url]);
  } else {
    cache.popularTime = Date.now();
    //refresh the cache every 15 minutes = 900000

    request(url, function(error, response, body) {
      cache.popularRefresh = false;

      body = JSON.parse(body);

      cache[url] = body;

      res.json(cache[url]);
    });
  }

});

app.get('/api/homepage/:id', function (req, res) {
  const url = `${DB_API}/movie/${req.params.id}?${qs.stringify({
    api_key: API,
    language: LANGUAGE
  })}`;
  console.log(Date.now(), req.url);

  if (typeof cache[url] !== "undefined") {
    res.send(cache[url]);
  } else {
    request(url, function(error, response, body) {
      let homepage = JSON.parse(body).homepage;
      cache[url] = { homepage: homepage };
      res.send(cache[url]);
    });
  }
})

app.get('/api/search/movie', function(req, res) {

  const url = `${DB_API}/search/movie/?${qs.stringify({
    api_key: API,
    language: LANGUAGE,
    query: req.query.query,
    page: req.query.page
  })}`;
  console.log(Date.now(), req.url);

  if (typeof cache[url] !== "undefined") {
    res.send(cache[url]);
  } else {
    request(url, function(error, response, body) {
      body = JSON.parse(body);
      cache[url] = body.results;
      res.send(cache[url]);
    });
  }
})

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 8080);