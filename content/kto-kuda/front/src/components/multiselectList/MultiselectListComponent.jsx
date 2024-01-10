import { useEffect } from 'react'
import { useState } from 'react'
import styles from './MultiselectListComponent.module.css'

export const MultiselectListComponent = (props) => {

  const [visible, setVisible] = useState(false)
  const [readyData, setReadyData] = useState(props.data)
  const [query, setQuery] = useState('')
  const addItem = (el) => {
    setVisible(false)
    props.setItem([...props.selectedData, el])
  }

  const deleteItem = (el) => {
    let filteredArr = props.selectedData
    filteredArr = filteredArr.filter((item) => item !== el)
    props.setItem(filteredArr)
  }

  useEffect(() => {
    let filteredArray = props.data
    filteredArray = filteredArray.filter((item) => item.toLowerCase().includes(query.toLowerCase()))
    if (props.selectedData.length !== 0) {
      filteredArray = filteredArray.filter((el) => {
        return props.selectedData.every((f) => {
          return f !== el
        });
      });
      return setReadyData(filteredArray)
    }
    setReadyData(filteredArray)
  }, [props.selectedData, query])

  return (
    <div className={`${styles.dropDown} relative`}>
      <input value={query} onChange={(e) => setQuery(e.target.value)} onClick={() => setVisible(!visible)} type="text" placeholder={`Выберите ${props.placeholder}`} />
      <div className={`${styles.selectedItems} flex flex-wrap`}>
        {props.selectedData.length !== 0 &&
          props.selectedData.map((el, idx) => {
            return <div key={idx}>
              <span>{el}</span>
              <svg onClick={() => deleteItem(el)} xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-x ml-2" viewBox="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
              </svg>
            </div>
          })
        }
      </div>
      <div className={`${styles.dropDownList} ${visible && styles.listVisible}`}>
        {readyData.length !== 0 ? readyData.map((el, idx) => {
          return <div className='cursor-pointer p-3' onClick={() => addItem(el)} key={idx}>{el}</div>
        }) : <div className='cursor-pointer p-3'>Не найдено</div>}
      </div>
    </div>
  )
}
