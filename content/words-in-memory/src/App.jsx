import { useState } from "react";
import EndGameScreen from "./EndGameScreen";
import GameScreen from "./GameScreen";
import WelcomeScreen from "./WelcomeScreen";
import { wordsArr } from "./words";

const App = () => {

  const [gameStatus, setGameStatus] = useState('welcome')
  const [win, setWin] = useState(false)
  const [finalWordsArr, setFinalWordsArr] = useState([])
  const [timeForWord, setTimeForWord] = useState('')
  const [wordsNumber, setWordsNumber] = useState('')
  const [welcomeScreenErrors, setWelcomeScreenErrors] = useState('')

  const startGame = () => {
    if (wordsNumber === '' || timeForWord === '') {
      return setWelcomeScreenErrors('Fill all fields')
    }
    if (wordsNumber > wordsArr.length || wordsNumber < 1 || timeForWord < 1) {
      return setWelcomeScreenErrors('Fill in the fields correctly')
    }
    setWelcomeScreenErrors('')
    let arr = []
    while (arr.length < wordsNumber) {
      let number = Math.floor(Math.random() * wordsArr.length);
      if (arr.indexOf(number) === -1) arr.push(number);
    }
    let finalArr = []
    for (let i = 0; i < wordsArr.length; i++) {
      for (let j = 0; j < arr.length; j++) {
        if (i == arr[j]) finalArr.push({word: wordsArr[i], isGuessed: false})
      }
    }
    setFinalWordsArr(finalArr)
    setGameStatus('game')
  }

  const gameStatusHandler = () => {
    switch (gameStatus) {
      case 'welcome': return <WelcomeScreen wordsArr={wordsArr} startGame={startGame} welcomeScreenErrors={welcomeScreenErrors} setWordsNumber={setWordsNumber} setTimeForWord={setTimeForWord} />
      case 'game': return <GameScreen setGameStatus={setGameStatus} setWin={setWin} timeForWord={timeForWord} setFinalWordsArr={setFinalWordsArr} finalWordsArr={finalWordsArr} />
      case 'end': return <EndGameScreen setTimeForWord={setTimeForWord} setWordsNumber={setWordsNumber} setGameStatus={setGameStatus} setWin={setWin} win={win} />

      default: break;
    }
  }

  return (
    <div className="app">
      <h1>Words in memory game</h1>
      {gameStatusHandler()}
    </div>
  );
}

export default App;
