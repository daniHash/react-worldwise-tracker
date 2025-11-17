import { useNavigate } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { isAuth } = useAuthContext();

  useEffect(() => {
    if (!isAuth) navigate("/");
  }, [isAuth, navigate]);
  return isAuth && children;
};

export default ProtectedRoute;
