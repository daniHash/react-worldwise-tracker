import { createContext, useCallback, useEffect, useReducer } from "react";
const API_BASE = "http://localhost:8000/";
const CitiesContext = createContext();
const initialState = {
  isLoader: true,
  cities: [],
  cityDetails: {},
  error: "",
};
const reducer = (state, action) => {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoader: action.payload,
      };
    case "rejected":
      return {
        ...state,
        error: action.payload,
        isLoader: true,
      };
    case "cities/loaded":
      return {
        ...state,
        cities: action.payload,
        isLoader: true,
      };
    case "city/loaded":
      return {
        ...state,
        cityDetails: action.payload,
        isLoader: true,
      };
    case "city/created":
      return {
        ...state,
        cities: [...state.cities, action.payload],
        isLoader: true,
      };
    case "city/deleted":
      return {
        ...state,
        cities: state.cities.filter((c) => c.id !== action.payload),
        isLoader: true,
      };
    default:
      console.log("Unknown action type");
  }
};
const CitiesProvider = ({ children }) => {
  const [{ isLoader, cities, cityDetails }, dispatch] = useReducer(
    reducer,
    initialState
  );
  useEffect(() => {
    const controller = new AbortController();
    async function fetchData() {
      try {
        dispatch({ type: "loading", payload: false });
        const res = await fetch(`${API_BASE}cities`, {
          signal: controller.signal,
        });
        if (!res.ok) {
          console.log("something was wrong");
        }
        const data = await res.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch (err) {
        if (err.name !== "AbortError")
          dispatch({ type: "rejected", payload: err });
      }
    }

    fetchData();

    return () => controller.abort();
  }, []);
  const getCity = useCallback(
    async function getCity(id) {
      if (id === cityDetails.id) return;
      try {
        dispatch({ type: "loading", payload: false });
        const res = await fetch(`${API_BASE}cities/${id}`);
        if (!res.ok) {
          console.log("something was wrong");
        }
        const data = await res.json();
        dispatch({ type: "city/loaded", payload: data });
      } catch (err) {
        if (err.name !== "AbortError")
          dispatch({ type: "rejected", payload: err });
      }
    },
    [cityDetails.id]
  );

  async function createCity(newCity) {
    try {
      dispatch({ type: "loading", payload: false });
      const res = await fetch(`${API_BASE}cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        console.log("something was wrong");
      }
      const data = await res.json();
      dispatch({ type: "city/created", payload: data });
    } catch (err) {
      dispatch({ type: "rejected", payload: err });
    }
  }
  async function deleteCity(id) {
    try {
      dispatch({ type: "loading", payload: false });
      const res = await fetch(`${API_BASE}cities/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        console.log("something was wrong");
      }
      if (res.ok) dispatch({ type: "city/deleted", payload: id });
    } catch (err) {
      dispatch({ type: "rejected", payload: err });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading: isLoader,
        cityDetails,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
};

export { CitiesProvider, CitiesContext };
