import { useState } from 'react';
import styles from './FullWPopUpComponent.module.css'

const FullWPopUpComponent = ({ popUpVisible, setPopUpVisible, title, children, confirmFn, checkBox }) => {

    const [checkBoxValue, setCheckBoxValue] = useState(false)

    return (
        <div onClick={() => setPopUpVisible(false)} className={`${styles.popupWrapper} ${popUpVisible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
            <div onClick={(e) => e.stopPropagation()} className={`${styles.popupContent}`}>
                <div className='flex items-center justify-between'>
                    <h3>{title}</h3>
                    <svg onClick={() => setPopUpVisible(false)} xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                    </svg>
                </div>
                <p className='my-3'>{children}</p>
                {checkBox.text !== '' && <div onClick={() => setCheckBoxValue(!checkBoxValue)} className='mb-2 cursor-pointer flex items-center'>
                    {checkBoxValue ?
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#a6adc2" class="bi bi-check-square-fill" viewBox="0 0 16 16">
                            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z" />
                        </svg>
                        :
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#a6adc2" class="bi bi-square" viewBox="0 0 16 16">
                            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                        </svg>
                    }
                    <span className='text-sm text-slate-500 ml-2'>{checkBox.text}</span> 
                </div>
                }
                <div className={`flex justify-between`}>
                    <div onClick={() => setPopUpVisible(false)} className={`${styles.confirmBtn}`}>Отмена</div>
                    <div onClick={() => { confirmFn(checkBoxValue); setPopUpVisible(false) }} className={`${styles.confirmBtn}`}>Подтвердить</div>
                </div>
            </div>
        </div>
    )
}

export default FullWPopUpComponent;
