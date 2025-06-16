import React from 'react';
import Die from './Die';
import './App.css';
import Confetti from "react-confetti";

function App() {
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);

  React.useEffect(() => {
    const allHeld = dice.every(die => die.isHeld);
    const firstVal = dice[0].value;
    const allSame = dice.every(die => die.value === firstVal);
    if (allHeld && allSame) {
      setTenzies(true);
    }
  }, [dice]);

  function generateDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: crypto.randomUUID()
    };
  }

  function allNewDice() {
    let newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateDie());
    }
    return newDice;
  }

  function rollDice() {
    if (tenzies) {
      setTenzies(false);
      setDice(allNewDice());
    } else {
      setDice(oldDice =>
        oldDice.map(die => { return die.isHeld ? die : generateDie()})
      );
    }
  }

  function holdDice(id) {
    setDice(oldDice =>
      oldDice.map(die =>{
        
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
   } )
    );
  }

//   const diceElements = dice.map(die => {
//     return(
//     <Die
//       key={die.id}
//       value={die.value}
//       isHeld={die.isHeld}
//       holdDice={() => holdDice(die.id)}
//     />
//   );
// }
// );

  return (
    <main>
      {tenzies && <Confetti/>}
      <h1>Tenzies</h1>
      <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="container">{dice.map(die => (
    <div
      key={die.id}
         className={`die ${die.isHeld ? 'held' : ''}`}
      onClick={() => holdDice(die.id)}
    >
      {die.value}
      </div>))}</div>
  
      <button className="rollDice" onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
    </main>
  );
}

export default App;
