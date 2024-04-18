import { useState } from 'react';
import styles from './SidePopUp.module.css'
import { useDispatch, useSelector } from "react-redux";

const SidePopUp = ({ popUpVisible, hidePopup, children }) => {

    const dispatch = useDispatch()
    const { sidePopUp } = useSelector(state => state.visibleStates)
    const titles = {
        'changeAdress': 'Выбрать адрес',
        'auth': 'Авторизация',
        'lk': '',
        'story': '',
        'product': '',
    }

    return (
        <div className={`${styles.popupWrapper} ${popUpVisible && styles.show} rounded`}>
            <div className='flex items-center justify-between mb-5'>
                <h2>{titles[sidePopUp.children]}</h2>
                <svg onClick={() => dispatch(hidePopup())} xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="#0000003d" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
                </svg>
            </div>
            {children}
        </div>
    )
}

export default SidePopUp;
