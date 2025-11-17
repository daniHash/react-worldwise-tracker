import styles from "./Button.module.css";

const Button = ({ children, onClick, btnType, type }) => {
  return (
    <button
      type={btnType || "button"}
      className={`${styles.btn} ${styles[type]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
