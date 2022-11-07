
function DiceComponent({ value }) {

  const checkDiceDots = () => {
    switch (value) {
      case 1:
        return (
          <>
            <div className="diceCols"></div>
            <div className="diceCols justify-center">
              <div className="diceDot"></div>
            </div>
            <div className="diceCols"></div>
          </>
        )
      case 2:
        return (
          <>
            <div className="diceCols"><div className="diceDot"></div></div>
            <div className="diceCols"></div>
            <div className="diceCols justify-end"><div className="diceDot"></div></div>
          </>
        )
      case 3:
        return (
          <>
            <div className="diceCols"><div className="diceDot"></div></div>
            <div className="diceCols justify-center"><div className="diceDot"></div></div>
            <div className="diceCols justify-end"><div className="diceDot"></div></div>
          </>
        )
      case 4:
        return (
          <>
            <div className="diceCols justify-between">
              <div className="diceDot"></div>
              <div className="diceDot"></div>
            </div>
            <div className="diceCols"></div>
            <div className="diceCols justify-between">
              <div className="diceDot"></div>
              <div className="diceDot"></div>
            </div>
          </>
        )
      case 5:
        return (
          <>
            <div className="diceCols justify-between">
              <div className="diceDot"></div>
              <div className="diceDot"></div>
            </div>
            <div className="diceCols justify-center"><div className="diceDot"></div></div>
            <div className="diceCols justify-between">
              <div className="diceDot"></div>
              <div className="diceDot"></div>
            </div>
          </>
        )
      case 6:
        return (
          <>
            <div className="diceCols justify-between">
              <div className="diceDot"></div>
              <div className="diceDot"></div>
            </div>
            <div className="diceCols justify-between">
              <div className="diceDot"></div>
              <div className="diceDot"></div>
            </div>
            <div className="diceCols justify-between">
              <div className="diceDot"></div>
              <div className="diceDot"></div>
            </div>
          </>
        )
      default: return ''
    }
  }

  return (
    <div className={`dice ${value === 0 && 'emptyDice'}`}>
      {checkDiceDots()}
    </div>
  );
}

export default DiceComponent;
