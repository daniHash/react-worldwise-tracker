import PageNav from "../Components/PageNav";
import styles from "./Login.module.css";
import { useEffect, useState } from "react";
import useAuthContext from "../hooks/useAuthContext";
import Button from "../Components/Button";
import { useNavigate } from "react-router-dom";
export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");
  const { login, isAuth } = useAuthContext();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };
  useEffect(() => {
    document.title = "WorlWise | Login";

    return function () {
      document.title = "WorldWise";
    };
  }, []);
  useEffect(() => {
    if (isAuth) navigate("/app", { replace: true });
  }, [isAuth, navigate]);
  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type="primary" btnType="submit">
            Login
          </Button>
        </div>
      </form>
    </main>
  );
}
