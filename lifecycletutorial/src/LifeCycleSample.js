import React, { Component } from "react";

// 1. getColor() 잘 동작하는지 다시 확인
// 2. state => colorCodes and colorIndex
// 3. 컬러코드는 props으로 받거나 컴포넌트 생성될 때 실행
// 4. render() 내에서 style.color => this.colorCodes[this.colorIndex]
// 그럼 되겠지...

class LifeCycleSample extends Component {
  state = {
    number: 0,
    color: null,
  };

  myRef = null;

  constructor(props) {
    super(props);
    console.log("constructor 생성 됨");
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log(
      "getDerivedStateFromProps 메서드가 실행 되면서 props의 값을 state에 넘겨 줄거예요."
    );
    if (nextProps.color !== prevState.color) {
      return { color: nextProps.color };
    }
    return null;
  }

  getColor() {
    let colorArray = [];
    for (let i = 0; i < 6; i++) {
      colorArray[i] = "#" + Math.floor(Math.random() * 16777215).toString(16);
      console.log(colorArray[i]);
      if (i > 6) {
        i = 0;
        continue;
      }
    }
    return colorArray;
  }

  componentDidMount() {
    console.log("컴포넌트 생성 끝, 렌더링이 끝났어요");
  }

  handleClick = () => {
    this.setState({
      number: this.state.number + 1,
    });
  };

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log("getSnapshotBeforeUpdate 메서드 실행");
    if (prevProps.color !== this.props.color) {
      return this.myRef.style.color;
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log(
      "componentDidUpdate 메서드가 실행됩니다.",
      prevProps,
      prevState
    );
    if (snapshot) {
      console.log("업데이트 되기 직전의 색상: ", snapshot);
    }
  }

  render() {
    console.log("render");
    const style = {
      color: this.props.colorArray,
    };

    return (
      <div>
        <h1 style={style} ref={(ref) => (this.myRef = ref)}>
          {this.state.number}
        </h1>
        <p>color: {this.state.colorArray}</p>
        <button onClick={this.handleClick}>더하기 ++;</button>
      </div>
    );
  }
}

export default LifeCycleSample;
