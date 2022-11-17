import { useEffect, useState } from "react"

const GameScreen = ({ setGameStatus, setWin, timeForWord, finalWordsArr, setFinalWordsArr }) => {

  const [readySlideShow, setReadySlideShow] = useState(false)
  const [isSlideShowEnd, setIsSlideShowEnd] = useState(false)
  const [attemptNumber, setAttemptNumber] = useState(3)
  const [word, setWord] = useState('')
  const [inputedWord, setInputedWord] = useState('')

  const wordsSlideShow = () => {
    setReadySlideShow(true)
    let i = 0
    let interval = setInterval(() => {
      if (i >= finalWordsArr.length) {
        setIsSlideShowEnd(true)
        return clearInterval(interval)
      }
      setWord(finalWordsArr[i].word)
      i++
    }, timeForWord * 1000)
  }

  const guessWord = (value) => {
    let arr = finalWordsArr
    setInputedWord('')
    let candidateIndex = finalWordsArr.findIndex(el => el.word === value)
    if (candidateIndex !== -1) {
      arr[candidateIndex].isGuessed = true
      let unGuessedWord = arr.find(el => el.isGuessed === false)
      if (unGuessedWord == undefined) {
        setGameStatus('end')
        setWin(true)
      }
      setFinalWordsArr(arr)
    } else setAttemptNumber(attemptNumber - 1)
  }

  useEffect(() => {
    if (attemptNumber < 1) {
      setGameStatus('end')
    }
  }, [attemptNumber])

  return (
    <div className="gameScreen">
      {!readySlideShow && <h2 className="linkItem" onClick={() => wordsSlideShow()}>I`m ready</h2>}
      {!isSlideShowEnd && <h3>{word}</h3>}
      {isSlideShowEnd &&
        <>
          <span className="d-flex justify-center">Attempts: {attemptNumber}</span>
          <div className='wordsList'>
            {finalWordsArr.map((el, idx) => <div key={idx} className={`${el.isGuessed ? 'guessedWord' : 'unGuessedWord'}`}>
              {el.isGuessed ? el.word : 'A'.repeat(el.word.length)}
            </div>)}
          </div>
          <div className='guessWordInput'>
            <input value={inputedWord} onChange={(e) => setInputedWord(e.target.value)} type="text" placeholder="Guess the word" />
            <span onClick={() => guessWord(inputedWord)} className="linkItem">Guess</span>
          </div>
        </>

      }
    </div>
  );
}

export default GameScreen;
