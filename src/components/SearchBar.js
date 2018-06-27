import React, { Component } from "react";

export default class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.triggerUpdate = this.triggerUpdate.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }
  handleKeyDown(e) {
    if (e.keyCode === 13) {
      this.triggerUpdate();
    }
  }
  triggerUpdate() {
    this.props.search(this.state.value);
  }
  render() {
    return (
      <div className="search">
        <span className="fa fa-search" onClick={this.triggerUpdate} />
        <input
          placeholder="Find a movie"
          value={this.state.value}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
        />
      </div>
    );
  }
}
