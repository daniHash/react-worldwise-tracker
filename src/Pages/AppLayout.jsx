import { useEffect } from "react";
import Map from "../Components/Map";
import Sidebar from "../Components/Sidebar";
import User from "../Components/User";
import styles from "./AppLayout.module.css";
const AppLayout = () => {
  useEffect(() => {
    document.title = "WorldWise | Main";

    return function () {
      document.title = "WorldWise";
    };
  }, []);
  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
      <User />
    </div>
  );
};

export default AppLayout;
