import { useState } from "react";

function App() {
  const [isGameStart, setIsGameStart] = useState(false)
  const [gameStatus, setGameStatus] = useState('')
  const [isGuessed, setIsGuessed] = useState(false)
  const [hint, setHint] = useState('Start guessing')
  const [welcomePageError, setWelcomePageError] = useState('')
  const [minSecretNumber, setMinSecretNumber] = useState(null)
  const [maxSecretNumber, setMaxSecretNumber] = useState(null)
  const [inputedNumber, setInputedNumber] = useState(null)
  const [inputedNumberError, setInputedNumberError] = useState('')
  const [secretNumber, setSecretNumber] = useState(null)
  const [points, setPoints] = useState(null)
  const [bestResult, setBestResult] = useState(0)

  const startGame = (min, max) => {
    min = Math.ceil(min) || null
    max = Math.floor(max) || null
    if (min == null || max == null) return setWelcomePageError('Enter the numbers')
    if (min >= max) return setWelcomePageError('The first number cannot be greater than or equal to the second')
    setWelcomePageError('')
    const number = Math.floor(Math.random() * (max - min + 1) + min)
    console.log(min, max, number)
    setPoints(max - min)
    setIsGameStart(true)
  }

  const startOver = () => {
    setMinSecretNumber(null)
    setMaxSecretNumber(null)
    setSecretNumber(null)
    setIsGameStart(false)
    setInputedNumber(null)
    setBestResult(0)
    setGameStatus('')
    setHint('Start guessing')
  }

  const checkNumber = (number) => {
    number = Number(number) || null
    if (gameStatus === '') {
      if (number == null) return setInputedNumberError('Enter the number')
      if (number > maxSecretNumber || number < minSecretNumber) return setInputedNumberError('Enter the number in the correct range')
      if (number !== secretNumber) {
        if (points > 1) {
          setPoints(points - 1)
          setInputedNumberError('')
          if (secretNumber > number) {
            return setHint('To little')
          } else return setHint('To much')
        } else {
          setHint('You lost!')
          return setGameStatus('lossScreen')
        }
      }
      setHint('Success!')
      setBestResult(points)
      setGameStatus('winScreen')
      return setIsGuessed(true)
    }

  }

  return (
    <div className={`app ${gameStatus}`}>
      {isGameStart ?
        <>
          <div className="header">
            <div className="link_item" onClick={() => startOver()}>Start over</div>
            <div>(Beetwen {minSecretNumber} and {maxSecretNumber})</div>
          </div>

          <h1 className="gameName text-center">Guess the number</h1>

          <div className="secretNumberBlock">
            <div className="line"></div>
            <div className="secretNumberValue">{isGuessed ? secretNumber : '???'}</div>
          </div>

          <div className="gameField">
            <div className="enterNumber">
              <input value={inputedNumber} onChange={(e) => setInputedNumber(e.target.value)} type="number" />
              <div className="checkNumber link_item" onClick={() => checkNumber(inputedNumber)}>Check</div>
              <div>{inputedNumberError !== '' && inputedNumberError}</div>
            </div>
            <div className="resultsWrapper">
              <div className="results">
                <h2>{hint}</h2>
                <span>Points: {points}</span>
                <span>Best result: {bestResult}</span>
              </div>
            </div>
          </div>
        </>
        :
        <div className="welcomePage">
          <h1>Welcome to Guess the number</h1>
          <h3>Select min and max num</h3>
          <div className="numSelectors">
            <input value={minSecretNumber} onChange={(e) => setMinSecretNumber(e.target.value)} type="number" placeholder="min" />
            <input value={maxSecretNumber} onChange={(e) => setMaxSecretNumber(e.target.value)} type="number" placeholder="max" />
          </div>
          <div className="link_item" onClick={() => startGame(minSecretNumber, maxSecretNumber)}>Start</div>
          <div>{welcomePageError !== '' && welcomePageError}</div>
        </div>
      }

    </div>
  );
}

export default App;
