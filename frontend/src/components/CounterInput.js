import React from 'react';

const CounterInput = ({ value, onDecrement, onIncrement }) => {
  // 组件的UI部分包含一个减少按钮、显示值的span和一个增加按钮
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* 减少按钮，点击时调用onDecrement函数 */}
      <button onClick={onDecrement} style={{ marginRight: '10px' }}>-</button>
      {/* 显示当前值的span */}
      <span style={{ margin: '0 10px' }}>{value}</span>
      {/* 增加按钮，点击时调用onIncrement函数 */}
      <button onClick={onIncrement} style={{ marginLeft: '10px' }}>+</button>
    </div>
  );
};

export default CounterInput;
