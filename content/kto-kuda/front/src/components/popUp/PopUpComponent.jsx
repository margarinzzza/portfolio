import styles from './PopUpComponent.module.css'

const PopUpComponent = (props) => {
  return (
    <div onClick={() => props.setPopUpVisible(false)} className={`${styles.popUp} ${props.popUpVisible && styles.popUp__active}`}>
      <div onClick={(e) => e.stopPropagation()} className={`${styles.popUpContent}`}>
        <div className={`flex justify-between items-center`}>
          <h3>{props.title}</h3>
          <svg onClick={() => props.setPopUpVisible(false)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="cursor-pointer bi bi-x-lg" viewBox="0 0 16 16">
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
          </svg>
        </div>
        <div>{props.children}</div>
      </div>
    </div>
  );
}

export default PopUpComponent;
