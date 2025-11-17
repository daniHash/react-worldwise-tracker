import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("َAuthcontext was used outside AuthProvider");
  return context;
};

export default useAuthContext;
