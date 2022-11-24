import styles from './SpinnerComponent.module.scss'

function SpinnerComponent() {

  return (
    <div className={`${styles.spinnerWrapper}`}>
      <div className={`${styles.spinner}`}></div>
    </div>
    
  );
}

export default SpinnerComponent;
