import { useContext } from "react";
import { CitiesContext } from "../contexts/CitiesContext";

const useCitiesContext = () => {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("CitiesContext was used out side the CitiesProvider");
  return context;
};

export default useCitiesContext;
