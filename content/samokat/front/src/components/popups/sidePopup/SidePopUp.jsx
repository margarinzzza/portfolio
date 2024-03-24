import { useState } from 'react';
import styles from './SidePopUp.module.css'

const SidePopUp = ({ popUpVisible, setPopUpVisible, title, children, confirmFn }) => {

    const [checkBoxValue, setCheckBoxValue] = useState(false)

    return (
        <div className={`${styles.popupWrapper} ${popUpVisible && styles.show}`}>
            {popUpVisible}
            {children}
        </div>
    )
}

export default SidePopUp;
