
const WelcomeScreen = ({ wordsArr, welcomeScreenErrors, startGame, setWordsNumber, setTimeForWord }) => {

  return (
    <div className="welcomeScreen">
      <div>
        <input onChange={(e) => setWordsNumber(e.target.value)} type="number" placeholder={`Number of words (max: ${wordsArr.length})`} min={1} />
        <input onChange={(e) => setTimeForWord(e.target.value)} type="number" placeholder="Time for one word (sec)" />
      </div>
      <span onClick={() => startGame()} className='linkItem'>Start</span>
      <p>{welcomeScreenErrors !== '' && welcomeScreenErrors}</p>
    </div>
  );
}

export default WelcomeScreen;
