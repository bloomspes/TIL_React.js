import React, { Component } from 'react';

class EventPractice extends Component {
  render() {
    return (
      <div>
        <h1>Event Handling</h1>
        <input
          type="text"
          name="message"
          placeholder="just write a message"
          onChange={(e) => {
            console.log(e.target.value);
          }}
        />
      </div>
    );
  }
}

export default EventPractice;
