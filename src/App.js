import React, { Component } from 'react';
import './App.css';

class SearchBar extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div>
        <input id="search"></input>
      </div>
    )
  }
}

class Movie extends Component {
  constructor(props) {
    super(props);
    this.getMovieUrl = this.getMovieUrl.bind(this);
  }
  getMovieUrl() {
    //For some reason couldnt find a easy way to append url so firing a call to get the homepage
    fetch('/api/homepage/' + this.props.id)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        window.location = result.homepage;
      })
      .catch((err) => {
        console.error(err)
      });
  }
  render() {
    const imageBase = 'https://image.tmdb.org/t/p/w300/';
    return (
      <div className="movies">
        <a onClick={this.getMovieUrl}>
          <img src={imageBase + this.props.image}></img>
          <p>{this.props.title}</p></a>
      </div>
    )
  }
}
class Result extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div id="movieGrid">
        {this.props.movies.map((cur, index) => {
          return <Movie key={index} id={cur.id} title={cur.title} image={cur.poster_path} />
        })}
      </div>
    )
  }
}
class App extends Component {
  constructor(props) {
    super();
    this.state = {
      movies: null,
      loaded: false
    }
    this.handleScroll = this.handleScroll.bind(this);
  }
  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);

    fetch('/api/movie/popular')
      .then((response) => {
        return response.json();
      })
      .then((result) => {

        this.setState({
          movies: result.results,
          loaded: true
        });
      })
      .catch((err) => {
        // console.error(err)
      });
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll() {
    if ((window.innerHeight + Math.ceil(window.pageYOffset)) >= document.body.offsetHeight) {
      //user is currently at the bottom
      //TODO - fire another call to append to movie grid
    }
  }

  render() {
    let { movies, loaded } = this.state;
    return (
      <div className="App" onScroll={this.handleScroll.bind(this)}>
        <SearchBar />
        {loaded ? <Result movies={movies} /> : ''}
      </div>
    );
  }
}

export default App;

