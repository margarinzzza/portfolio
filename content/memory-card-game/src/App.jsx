import { useEffect, useState } from "react";

const App = () => {

  const [movesNum, setMovesNum] = useState(0)
  const [timer, setTimer] = useState({ seconds: 0, minutes: 0 })
  const [initialCardsArrLength, setInitialCardsArrLength] = useState(null)
  const [isGameStart, setIsGameStart] = useState(false)
  const [complexity, setComplexity] = useState(null)
  const [selectedCards, setSelectedCards] = useState([])
  const [cardsArr, setCardsArr] = useState([])
  const [matchedCards, setMatchedCards] = useState([])

  const checkGameComplexity = () => {
    let complexityLevel
    let arr = [...new Array(3)]

    switch (complexity) {
      case 'lowComplexity':
        complexityLevel = 1
        break

      case 'midComplexity':
        complexityLevel = 2
        break

      case 'highComplexity':
        complexityLevel = 3
        break

      default: break;
    }

    return arr.map((el, idx) => {
      if (idx + 1 <= complexityLevel) {
        return (
          <svg key={idx} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
          </svg>
        )
      } else {
        return (
          <svg key={idx} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star" viewBox="0 0 16 16">
            <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
          </svg>
        )
      }
    })

  }

  const selectCard = (value) => {
    if (selectedCards.length !== 2) {
      let candidate
      let arr
      for (let i = 0; i < selectedCards.length; i++) {
        if (selectedCards[i] === value.idx) candidate = true
      }
      if (candidate) {
        arr = selectedCards.filter(el => el !== value.idx)
        return setSelectedCards(arr)
      }
      setSelectedCards([...selectedCards, value])
    }
  }

  useEffect(() => {
    if (selectedCards.length === 2) {
      if (selectedCards[0].el === selectedCards[1].el) {
        let matchedCardsArr = [selectedCards[0], selectedCards[1]]
        setMatchedCards([...matchedCards, ...matchedCardsArr])
        setTimeout(() => {
          setSelectedCards([])
        }, 1000)
      } else {
        setTimeout(() => {
          setMovesNum(movesNum + 1)
          setSelectedCards([])
        }, 1000)
      }
    }
  }, [selectedCards])

  useEffect(() => {
    if (matchedCards.length === initialCardsArrLength) {
      endGame()
    }
  }, [matchedCards])

  const checkSelectedCards = (value) => {
    let candidate
    for (let i = 0; i < selectedCards.length; i++) {
      if (selectedCards[i].idx === value) {
        candidate = true
      }
    }
    if (candidate) {
      return 'selectedCard'
    } else return ''
  }

  const checkMatchedCards = (value) => {
    let candidate
    for (let i = 0; i < matchedCards.length; i++) {
      if (matchedCards[i].el === value) {
        candidate = true
      }
    }
    if (candidate) {
      return 'matchedCard'
    } else return ''
  }

  const createRandomNumbers = (length, max) => {
    let arr = [];
    while (arr.length < length / 2) {
      let number = Math.floor(Math.random() * max) + 1;
      if (arr.indexOf(number) === -1) arr.push(number);
    }
    return arr
  }

  useEffect(() => {
    let arr = []
    switch (complexity) {
      case 'lowComplexity':
        arr = createRandomNumbers(12, 100)
        break

      case 'midComplexity':
        arr = createRandomNumbers(20, 100)
        break

      case 'highComplexity':
        arr = createRandomNumbers(48, 100)
        break

      default: break;
    }
    let finalArr = [...arr, ...arr]
    setCardsArr(finalArr)
    setInitialCardsArrLength(finalArr.length)
  }, [complexity])

  function endGame ()  {
    setIsGameStart(false)
    setComplexity(null)
    setSelectedCards([])
    setMatchedCards([])
    setMovesNum(0)
    setTimer({ seconds: 0, minutes: 0 })
    clearInterval(window.timerrrr)
  }

  function startGame (complexity) {
    let startGameTime = Date.now();
    setIsGameStart(true)
    setComplexity(complexity)
    window.timerrrr = setInterval(() => {
      let delta = Date.now() - startGameTime;
      let s = Math.floor(delta / 1000)
      let m = 0
      if (s >= 60) {
        s -= 60
        m += 1
      }
      let newTimer = { minutes: m, seconds: s }
      setTimer(newTimer) 
    }, 1000);
  }

  const checkTimer = () => {
    let m
    let s
    if (timer.seconds < 10) s = `0${timer.seconds}`; else s = timer.seconds
    if (timer.minutes < 10) m = `0${timer.minutes}`; else m = timer.minutes
    return `${m}:${s}`
  }

  return (
    <div className="app">
      <h1>Matching Game</h1>
      {isGameStart ?
        <>
          <div className="gameInfo">
            <div className="complexity">{checkGameComplexity()}</div>
            <div className="time">{checkTimer()}</div>
            <div className="moves">{movesNum} Moves</div>
            <div>
              <svg onClick={() => endGame()} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z" />
                <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
              </svg>
            </div>
          </div>
          <div className={`gameField ${complexity !== null && complexity}`}>
            {cardsArr.map((el, idx) => {
              return <div onClick={() => selectCard({ idx, el })} key={idx} className={`card ${checkSelectedCards(idx)} ${checkMatchedCards(el)}`}>
                <span>{el}</span>
              </div>
            })}
          </div>
        </> :
        <div>
          <h2>Select difficulty level</h2>
          <div className="difficultySelector">
            <span onClick={() => startGame('lowComplexity')}>Low</span>
            <span onClick={() => startGame('midComplexity')}>Middle</span>
            <span onClick={() => startGame('highComplexity')}>Hard</span>
          </div>
        </div>
      }

    </div>
  );
}

export default App