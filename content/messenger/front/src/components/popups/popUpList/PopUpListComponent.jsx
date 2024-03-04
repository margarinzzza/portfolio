import styles from './PopUpListComponent.module.css'

const PopUpListComponent = ({ data, popUpVisible, selectItem }) => {

    return (
        <div className={`${styles.popup} ${popUpVisible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
            <div className={`${styles.popupList}`}>{data.map((el, idx) => <div onClick={() => el.fn()} key={idx}>{el.title}</div>)}</div>
        </div>
    )
}

export default PopUpListComponent;
