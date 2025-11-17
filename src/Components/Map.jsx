import styles from "./Map.module.css";
import { useNavigate } from "react-router-dom";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useEffect, useState } from "react";
import Button from "./Button";
import useCitiesContext from "../hooks/useCitiesContext";
import { useGeolocation } from "../hooks/useGeolocation";
import useGeoLocationPosition from "../hooks/useGeoLocationPosition";
const Map = () => {
  const [mapPosition, setMapPosition] = useState([51.505, -0.09]);
  const { cities } = useCitiesContext();
  const { isLoading, position, getPosition } = useGeolocation();
  const [lat, lng] = useGeoLocationPosition();
  useEffect(() => {
    if (lat && lng) setMapPosition([lat, lng]);
  }, [lat, lng]);
  useEffect(() => {
    if (position) setMapPosition([position.lat, position.lng]);
  }, [position]);
  return (
    <div className={styles.mapContainer}>
      {!position && (
        <Button type="position" onClick={getPosition}>
          {" "}
          {isLoading ? "Loading..." : "Use your position"}
        </Button>
      )}

      <MapContainer
        className={styles.map}
        center={mapPosition}
        zoom={18}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPosition} />
        <ClickMap />
      </MapContainer>
    </div>
  );
};
const ChangeCenter = ({ position }) => {
  const map = useMap();
  map.setView(position);
  return null;
};
const ClickMap = () => {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
};
export default Map;
