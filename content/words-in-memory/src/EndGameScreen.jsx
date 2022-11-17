
const EndGameScreen = ({ setTimeForWord, setWordsNumber, setWin, setGameStatus, win }) => {

  const playAgain = () => {
    setGameStatus('welcome')
    setWin(false)
    setTimeForWord('')
    setWordsNumber('')
  }

  return (
    <div className="EndGameScreen">
      {win ?
        <h3>You win</h3>
        :
        <h3>You lose</h3>
      }
      <span onClick={() => playAgain()} className="linkItem d-flex justify-center">Play again</span>
    </div>
  );
}

export default EndGameScreen;
