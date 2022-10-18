import style from '../components/firstTask/FirstTaskPage.module.scss'

export const checkFlightsLength = (data, allFlightTimes, setAllFlightTimes) => {
  if (allFlightTimes) {
    return data.map((el, idx) => {
      return (<div key={idx} className={`${style.itemDescriptionFlight}`}>{el}</div>)
    })

  } else {
    return data.map((el, idx) => {
      if (idx < 3) {
        return (
          <>
            {idx === 2 ?
              <div className={`${style.itemDescriptionFlight}`} onClick={() => { setAllFlightTimes(true) }}>еще...</div>
              :
              <div className={`${style.itemDescriptionFlight}`}>{el}</div>
            }
          </>
        )
      }
    })
  }
}

export const time_word = (value, words) => {
  //час, часа, часов
  value = Math.abs(value) % 100;
  var num = value % 10;
  if (value > 10 && value < 20) return words[2];
  if (num > 1 && num < 5) return words[1];
  if (num === 1) return words[0];
  return words[2];
}

export const translateDateStringToNum = (value) => {
  if (value) {
    const ymdObj = {}
    const days = Number(value[8] + value[9])
    const month = Number(value[5] + value[6])
    const years = Number(value[0] + value[1] + value[2] + value[3])
    ymdObj.years = years
    ymdObj.month = month
    ymdObj.days = days
    return ymdObj
  }
}

export const translateTimeStringToNum = (value) => {
  if (value) {
    const hmObj = {}
    const minutes = Number(value[3] + value[4])
    const hours = Number(value[0] + value[1])
    hmObj.hours = hours
    hmObj.minutes = minutes
    return hmObj
  }
}