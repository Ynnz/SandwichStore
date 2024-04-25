import React from 'react';

const CounterInput = ({ value, onDecrement, onIncrement }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <button onClick={onDecrement} style={{ marginRight: '10px' }}>-</button>
      <span style={{ margin: '0 10px' }}>{value}</span>
      <button onClick={onIncrement} style={{ marginLeft: '10px' }}>+</button>
    </div>
  );
};

export default CounterInput;
