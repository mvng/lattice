import React, { Component } from "react";
import SearchBar from "./components/SearchBar";
import MovieGrid from "./components/MovieGrid";
import "./App.css";

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      movies: null,
      loaded: false,
      currentPage: 1,
      currentUrl: "/api/movie/popular"
    };
    this.handleScroll = this.handleScroll.bind(this);
    this.search = this.search.bind(this);
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
    fetch("/api/movie/popular?page=" + this.state.currentPage)
      .then(response => {
        return response.json();
      })
      .then(result => {
        this.setState({ movies: result.results, loaded: true });
      })
      .catch(err => {});
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }
  search(query) {
    this.setState({ currentUrl: "/api/search/movie", currentPage: 1 });
    fetch("/api/search/movie?query=" + query)
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
      // window.scrollTo(0, window.innerHeight*.95);
      //user is currently at the bottom
      let currentPage = this.state.currentPage + 1;

      //assigns dynamic url for inifinite scrolling
      fetch(this.state.currentUrl + "?page=" + currentPage)
        .then(response => {
          return response.json();
        })
        .then(result => {
          //Since success, lets update the state of the page
          this.setState({ currentPage: currentPage });

          var curr = this.state.movies;

          for (let i in result.results) {
            curr.push(result.results[i]);
          }

          this.setState({ movies: curr });
        })
        .catch(err => {
        });
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
