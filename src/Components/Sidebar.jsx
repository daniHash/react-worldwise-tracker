import Logo from "./Logo";
import AppNav from "./AppNav";
import styles from "./Sidebar.module.css";
import CopyRight from "./CopyRight";
import { Outlet } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      <Outlet />
      <CopyRight />
    </div>
  );
};

export default Sidebar;
