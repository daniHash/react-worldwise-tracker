import { createContext, useReducer } from "react";
// import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuth: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "logined":
      return {
        ...state,
        user: action.payload,
        isAuth: true,
      };
    case "logout":
      return {
        ...state,
        user: null,
        isAuth: false,
      };
    default:
      throw new Error("Action type is undefined");
  }
};
const AuthProvider = ({ children }) => {
  const [{ user, isAuth }, dispatch] = useReducer(reducer, initialState);
  const login = (email, password) => {
    const user = {
      name: email.split("@")[0],
      email,
      password,
      avatar: "https://i.pravatar.cc/100?u=zz",
    };

    dispatch({ type: "logined", payload: user });
    // navigate("/app");
  };
  const logout = () => {
    dispatch({ type: "logout" });
  };
  return (
    <AuthContext.Provider value={{ login, logout, user, isAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
export { AuthContext, AuthProvider };
