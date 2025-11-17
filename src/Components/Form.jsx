import { useEffect, useState } from "react";
import styles from "./Form.module.css";
import Button from "./Button";
import ButtonBack from "./ButtonBack";
import useGeoLocationPosition from "../hooks/useGeoLocationPosition";
import Message from "./Message";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import useCitiesContext from "../hooks/useCitiesContext";
import "react-datepicker/dist/react-datepicker.css";
const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}
function Form() {
  const [cityName, setCityName] = useState("");
  const [emoji, setEmoji] = useState("");
  const [country, setCountry] = useState("");
  const [geoLoading, setGeoLoading] = useState(true);
  const [err, setErr] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [lat, lng] = useGeoLocationPosition();
  const { createCity } = useCitiesContext();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        setErr("");
        setGeoLoading(true);
        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
        const data = await res.json();
        if (!data.countryCode)
          throw new Error(
            "That doesnt seem be a city. pleas click somewhere else!😊"
          );
        setCityName(data.city || data.locality || "");
        setCountry(data.countryName);
        setEmoji(convertToEmoji(data.countryCode));
      } catch (err) {
        setErr(err.message);
      } finally {
        setGeoLoading(false);
      }
    };
    fetchData();
  }, [lat, lng]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cityName || !date) return;
    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat, lng },
    };
    await createCity(newCity);
    navigate("/app/cities");
  };
  if (err) return <Message message={err} />;
  if (geoLoading) return <Spinner />;
  if (!lat && !lng) return <Message message="Start by clicking the map" />;
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        {/* <span className={styles.flag}>{emoji}</span> */}
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
          id="date"
          selected={date}
          onChange={(date) => setDate(date)}
          dateFormat="dd/mm/yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary" btnType="submit">
          Add
        </Button>
        <ButtonBack />
      </div>
    </form>
  );
}

export default Form;
