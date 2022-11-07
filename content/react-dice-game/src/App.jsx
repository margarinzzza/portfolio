import { useState } from "react";
import DiceComponent from "./DiceComponent";

function App() {

  const [playersData, setPlayersData] = useState([
    {
      id: 0,
      name: 'Player 1',
      currentPoints: 0,
      permanentPoints: 0,
    },
    {
      id: 1,
      name: 'Player 2',
      currentPoints: 0,
      permanentPoints: 0,
    }
  ])

  const [userIdxMove, setUserIdxMove] = useState(0)
  const [diceValue, setDiceValue] = useState(0)

  const rollDice = () => {
    let newState = [...playersData]
    let userObj = playersData[userIdxMove]
    const number = Math.floor(Math.random() * (6 - 1 + 1) + 1)
    setDiceValue(number)
    if (number !== 1) {
      userObj.currentPoints += number
    } else {
      userObj.currentPoints = 0
      let anotherUserIdx = playersData.findIndex(el => el.id !== userObj.id)
      setUserIdxMove(anotherUserIdx)
    }
    newState[userIdxMove] = userObj
    setPlayersData(newState)
  }

  const keep = () => {
    let newState = [...playersData]
    let userObj = playersData[userIdxMove]
    userObj.permanentPoints += userObj.currentPoints
    userObj.currentPoints = 0
    let anotherUserIdx = playersData.findIndex(el => el.id !== userObj.id)
    setUserIdxMove(anotherUserIdx)
    newState[userIdxMove] = userObj
    setPlayersData(newState)
  }

  const newGame = () => {
    let newState = [...playersData]
    for (let i = 0; i < newState.length; i++) {
      newState[i].currentPoints = 0
      newState[i].permanentPoints = 0
    }
    setPlayersData(newState)
    setUserIdxMove(0)
    setDiceValue(0)
  }

  return (
    <div className={`app`}>
      <div className="main">

        <div className="cards">
          {playersData.map((el, idx) => {
            return (
              <div key={idx} className={`card ${userIdxMove === idx && 'activeCard'}`}>
                <div className="playerInfo">
                  <h3>{el.name}</h3>
                  <h2 className="permanentPoints">{el.permanentPoints}</h2>
                </div>
                <div className="currentPoints">
                  <span>Current points</span>
                  <span>{el.currentPoints}</span>
                </div>
              </div>
            )
          })}
        </div>

        <div className="options">
          <div className="optionButton" onClick={() => newGame()}>🐷 New game</div>
          <DiceComponent value={diceValue} />
          <div>
            <div className="optionButton" onClick={() => rollDice()}>
              🎲 Roll the dice
            </div>
            <div className="optionButton" onClick={() => keep()}>
              👌🏻 Keep
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;
