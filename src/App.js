import React, { Component } from 'react';
import './App.css';

class SearchBar extends Component {
  constructor() {
    super();
  }
  render() {
    return(
      <div>
        <input id="search"></input>
      </div>
    )
  }
}

class Movie extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const imageBase = 'https://image.tmdb.org/t/p/w300/';

    return(
      <div class="movies">
        <img src={imageBase + this.props.image}></img>
        <p>{this.props.title}</p>
      </div>
    )
  }
}
class Result extends Component {
  constructor(props) {
    super(props);
    console.log(this);
    console.log(this.props);

  }

  render() {
    return(
      <div id="movieGrid">
      {this.props.movies.map((res) => {
        console.log(res);
        return <Movie title={res.title} image={res.poster_path} />
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
   }
  componentDidMount() {
    fetch('/api/movie/popular')
    .then((response) => {
      return response.json()
    })
    .then((result) =>{

      this.setState({
        movies: result.results,
        loaded: true
      });
    })
    .catch((err)=>{
      // console.error(err)
    });
  }
  render() {
    let { movies, loaded } = this.state;
    return (
      <div className="App">
        <SearchBar />
        {loaded ? <Result movies={movies}/> : '' }
      </div>
    );
  }
}

export default App;
