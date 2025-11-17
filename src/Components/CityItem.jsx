import { Link, useNavigate } from "react-router-dom";
import styles from "./CityItem.module.css";
import useCitiesContext from "../hooks/useCitiesContext";

const formatDate = (date) => {
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));
};
const CityItem = ({ city }) => {
  const { cityName, emoji, date, id, position } = city;
  const { cityDetails } = useCitiesContext();
  const { deleteCity } = useCitiesContext();
  const navigate = useNavigate();
  const handleDelete = (e) => {
    e.preventDefault();
    deleteCity(id);
    navigate("/app/cities");
  };
  return (
    <li>
      <Link
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
        className={`${styles.cityItem} ${
          id === cityDetails.id && styles["cityItem--active"]
        }`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>

        <button className={styles.deleteBtn} onClick={handleDelete}>
          &times;
        </button>
      </Link>
    </li>
  );
};

export default CityItem;
