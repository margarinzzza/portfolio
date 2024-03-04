import styles from "./LoadingComponent.module.css";

const LoadingComponent = ({ visible }) => {
  return (
    <div style={{  opacity: visible ? 100 : 0, pointerEvents: visible ? 'auto' : 'none' }} className={`${styles.loaderWrapper}`}>
      <div className={`${styles.loader}`}><div></div><div></div><div></div><div></div></div>
    </div>
  );
}

export default LoadingComponent;
