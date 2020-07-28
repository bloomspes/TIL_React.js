import React, { useState, Fragment } from 'react';
import axios from 'axios';

const app = () => {
  const [data, setData] = useState(null);
  const onClick = () => {
    axios
      .get('https://jsonplaceholder.typicode.com/todos/1')
      .then((response) => {
        setData(response.data);
      });
  };
  return (
    <Fragment>
      <Fragment>
        <button onClick={onClick}>load</button>
      </Fragment>
      {data && (
        <textarea
          rows={7}
          value={JSON.stringify(data, null, 2)}
          readOnly={true}
        />
      )}
    </Fragment>
  );
};

export default App;
