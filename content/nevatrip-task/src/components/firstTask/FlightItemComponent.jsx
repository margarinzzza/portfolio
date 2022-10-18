import { useState } from 'react'
import { checkFlightsLength } from '../../funcs/funcs';

const FlightItemComponent = ({ data }) => {

  const [allFlightTimes, setAllFlightTimes] = useState(false)

  return (
    <>
      {checkFlightsLength(data, allFlightTimes, setAllFlightTimes)}
    </>
  )
}

export default FlightItemComponent;
