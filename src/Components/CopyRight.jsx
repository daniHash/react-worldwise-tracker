import styles from "./CopyRight.module.css";

const CopyRight = () => {
  return (
    <footer className={styles.footer}>
      <p className={styles.copyright}>
        &copy; Copyright {new Date().getFullYear()} by WorldWise Inc.
      </p>
    </footer>
  );
};

export default CopyRight;
