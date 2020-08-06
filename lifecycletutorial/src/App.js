import React, { Component } from "react";
import LifeCycleSample from "./LifeCycleSample";

class App extends Component {
  state = {
    color: getColor().colorArray,
  };

  handleClick = () => {
    this.setState({
      color: getColor().colorArray,
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
