import React, { Component } from "react";

export default class Movie extends Component {
  constructor(props) {
    super(props);
    this.getMovieUrl = this.getMovieUrl.bind(this);
  }
  getMovieUrl() {
    //For some reason couldnt find a easy way to append url so firing a call to get the homepage
    fetch("/api/homepage/" + this.props.id)
      .then(response => {
        return response.json();
      })
      .then(result => {
        if (result.homepage) {
          window.location = result.homepage;
        } else {
          alert("Sorry! No Homepage here");
        }
      })
      .catch(err => {
        console.error(err);
      });
  }
  render() {
    const imageBase = "https://image.tmdb.org/t/p/w300/";
    return (
      <div className="movies">
        <a onClick={this.getMovieUrl}>
        {this.props.image ?  <img alt={this.props.title} src={imageBase + this.props.image} /> : <div className="noImage"></div>
     }
          <p className="title">{this.props.title}</p>
        </a>
      </div>
    );
  }
}
