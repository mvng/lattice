import React, { Component } from "react";
import SearchBar from "./components/SearchBar";
import MovieGrid from "./components/MovieGrid";
import "./App.css";

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      movies: null,
      loaded: false
    };
    this.handleScroll = this.handleScroll.bind(this);
    this.search = this.search.bind(this);
  }
  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);

    fetch("/api/movie/popular")
      .then(response => {
        return response.json();
      })
      .then(result => {
        this.setState({
          movies: result.results,
          loaded: true
        });
      })
      .catch(err => {});
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }
  search(query) {
    fetch("/api/search/movie/" + query)
      .then(response => {
        return response.json();
      })
      .then(result => {
        this.setState({
          movies: result
        });
      })
      .catch(err => {});
  }
  handleScroll() {
    if (
      window.innerHeight + Math.ceil(window.pageYOffset) >=
      document.body.offsetHeight
    ) {
      //user is currently at the bottom
      //TODO - fire another call to append to movie grid
    }
  }

  render() {
    let { movies, loaded } = this.state;
    return (
      <div className="App" onScroll={this.handleScroll.bind(this)}>
        <SearchBar search={this.search} />
        {loaded ? <MovieGrid movies={movies} /> : ""}
      </div>
    );
  }
}

export default App;
