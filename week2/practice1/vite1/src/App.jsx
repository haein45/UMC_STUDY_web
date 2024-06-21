import React, { useState } from 'react';

function App() {
  const [number, setNumber] = useState(0);

  const increase = () => {
    setNumber(prevNumber => prevNumber + 1);
  };

  const decrease = () => {
    setNumber(prevNumber => prevNumber - 1);
  };

  return (
    <div>
      <h3>{number}</h3>
      <div>
        <button onClick={increase}>+1</button>
        <button onClick={decrease}>-1</button>
      </div>
    </div>
  );
}

export default App;
