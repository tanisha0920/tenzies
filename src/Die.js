import React from 'react';
 function Die(props) {
 const design = {
    backgroundColor: props.isHeld ? '#00F0A8' : '',
  };
  return (
    <div className="die" style={design} onClick={props.holdDice}>
      <h2>{props.value}</h2>
    </div>
  );
    
}
export default Die;