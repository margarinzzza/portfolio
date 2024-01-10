import { useEffect } from 'react'
import { useState } from 'react'
import styles from './DropdownListComponent.module.css'

export const DropdownListComponent = ({ data, selectedItem, setItem, placeholder }) => {

    const [visible, setVisible] = useState(false)
    const [readyData, setReadyData] = useState(data)
    const [query, setQuery] = useState('')
    const selectItem = (el) => {
        setVisible(false)
        setItem(el)
        setQuery(el)
    }

    const deleteItem = () => {
        setVisible(false)
        setItem('')
        setQuery('')
    }

    useEffect(() => {
        let filteredArray = data
        filteredArray = filteredArray.filter((item) => item.toLowerCase().includes(query.toLowerCase()))
        setReadyData(filteredArray)
    }, [query])

    return (
        <div className={`${styles.dropDown} relative`}>
            <div className={`relative `}>
                <input className={`transition-all ${selectedItem !== '' && 'pointer-events-none bg-[#bfbcbc] rounded-[7px]'}`} value={selectedItem !== '' ? selectedItem : query} onChange={(e) => setQuery(e.target.value)} onClick={() => setVisible(!visible)} type="text" placeholder={`Выберите ${placeholder}`} />
                <svg onClick={() => deleteItem()} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={`
                bi bi-x-lg absolute right-[11px] bottom-[39%] opacity-0 transition-all
                pointer-events-none ${selectedItem !== '' && 'cursor-pointer opacity-100 pointer-events-auto'}
                `} viewBox="0 0 16 16">
                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                </svg>
            </div>
            <div className={`${styles.dropDownList} ${visible && styles.listVisible}`}>
                {readyData.length !== 0 ? readyData.map((el, idx) => {
                    return <div className='cursor-pointer p-3' onClick={() => selectItem(el)} key={idx}>{el}</div>
                }) : <div className='cursor-pointer p-3'>Не найдено</div>}
            </div>
        </div>
    )
}


