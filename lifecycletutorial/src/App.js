import React, { Component } from "react";
import LifeCycleSample from "./LifeCycleSample";

function getColor() {
  let colorArray = [];
  for (let i = 0; i < 6; i++) {
    colorArray[i] = "#" + Math.floor(Math.random() * 16777215).toString(16);
    console.log(colorArray[i]);
    if (i > 6) {
      i = 0;
    }
  }
}

class App extends Component {
  state = {
    color: "#000000",
  };

  handleClick = () => {
    this.setState({
      color: getColor(),
    });
  };

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>random</button>
        <LifeCycleSample color={this.state.colorArray} />
      </div>
    );
  }
}

export default App;
