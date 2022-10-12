import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector } from 'react-redux';
import './App.css';
import { currencies } from './store/store';
import { setFirstCurrensy, setSecondCurrensy, setFirstCurrensyValue, setSecondCurrensyValue } from './redux/slices/currenciesSlice';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';

const App = () => {
  const dispatch = useDispatch()
  const { firstCurrensy, secondCurrensy, firstCurrensyValue, secondCurrensyValue } = useSelector((state) => state.currencies)
  const [rates, setRates] = useState({})

  useEffect(() => {
    const curSuAPI = fetch('https://cdn.cur.su/api/latest.json')
      .then(res => res.json())
      .then(json => setRates(json.rates))
  }, [])

  useEffect(() => {
    const price = firstCurrensyValue / rates[firstCurrensy.name]
    const result = price * rates[secondCurrensy.name]
    dispatch(setSecondCurrensyValue(result))
  }, [secondCurrensy, firstCurrensy])

  const onChangeFromPrice = (value) => {
    const price = value / rates[firstCurrensy.name]
    const result = price * rates[secondCurrensy.name]
    dispatch(setFirstCurrensyValue(value))
    dispatch(setSecondCurrensyValue(result))
  }

  const onChangeToPrice = (value) => {
    const price = value / rates[secondCurrensy.name]
    const result = price * rates[firstCurrensy.name]
    dispatch(setFirstCurrensyValue(result))
    dispatch(setSecondCurrensyValue(value))
  }

  return (
    <div className={`app container-fluid g-0`}>
      <div className='content'>
        <div className='currencies-block d-flex'>

          <div className='first-currency-block me-2'>
            <ul className='currency-list first-currency-list d-flex'>
              {currencies.map((currency) => {
                return (
                  <li onClick={() => dispatch(setFirstCurrensy(currency.id))} key={currency.id} className={`first-currency-list-item ${firstCurrensy.id === currency.id && 'list-item-active'}`}>{currency.name}</li>
                )
              })}
            </ul>
            <div className='currency-value first-currency-value'>
              <input min={0} onChange={(e) => { onChangeFromPrice(e.target.value) }} type="number" value={firstCurrensyValue} name="fcv" />
            </div>
          </div>

          <div className='second-currency-block ms-2'>
            <ul className='currency-list second-currency-list d-flex'>
              {currencies.map((currency) => {
                return (
                  <li onClick={() => dispatch(setSecondCurrensy(currency.id))} key={currency.id} className={`first-currency-list-item ${secondCurrensy.id === currency.id && 'list-item-active'}`}>{currency.name}</li>
                )
              })}
            </ul>
            <div className='currency-value second-currency-value'>
              <input min={0} onChange={(e) => onChangeToPrice(e.target.value)} type="number" value={secondCurrensyValue} name="scv" />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;
