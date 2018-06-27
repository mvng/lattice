import React, { Component } from "react";
import Movie from "./Movie";

export default class MovieGrid extends Component {
  render() {
    return (
      <div id="movieGrid">
        {this.props.movies.map((cur, index) => {
          return (
            <Movie
              key={index}
              id={cur.id}
              title={cur.title}
              image={cur.poster_path}
            />
          );
        })}
      </div>
    );
  }
}
