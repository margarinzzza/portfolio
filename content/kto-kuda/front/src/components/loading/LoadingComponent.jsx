import styles from "./LoadingComponent.module.css";

const LoadingComponent = () => {
  return (
    <div className={`${styles.loader}`}><div></div><div></div><div></div><div></div></div>
  );
}

export default LoadingComponent;
