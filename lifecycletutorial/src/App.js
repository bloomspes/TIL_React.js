import React, { Component } from "react";
import LifeCycleSample from "./LifeCycleSample";

let COLOR_ARRAY = [];
const LENGTH = 6;

for (let i = 0; i < LENGTH; i++) {
  COLOR_ARRAY.push(`#${Math.floor(Math.random() * 16777215).toString(16)}`);
}

class App extends Component {
  state = {
    color: COLOR_ARRAY[0],
  };

  handleClick = () => {
    this.setState({
      color: COLOR_ARRAY[Math.floor(Math.random() * COLOR_ARRAY.LENGTH)],
    });
  };

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>random</button>
        <LifeCycleSample color={this.state.color} />
      </div>
    );
  }
}

export default App;
