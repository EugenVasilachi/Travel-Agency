import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import { getSession, login, loginAdmin } from "../utils/http";
import ErrorMessage from "./ErrorMessage.tsx";
import "../styles/login.css";
import Cookies from "universal-cookie";

type SessionType = {
  isAuthenticated: boolean;
};

const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const cookies = new Cookies();

  useEffect(() => {
    sessionStorage.setItem("isAuthenticated", "false");
    fetchSession();
  }, []);

  const fetchSession = async () => {
    try {
      const data = (await getSession(
        "http://localhost:8000/api/session/",
        "same-origin"
      )) as SessionType;

      if (data && typeof data.isAuthenticated !== "undefined") {
        sessionStorage.setItem(
          "isAuthenticated",
          data.isAuthenticated.toString()
        );
      }
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  };

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if (username === "eugenvasi") {
        const sessionid = sessionStorage.getItem("sessionid");
        await loginAdmin(
          "http://localhost:8000/api/login/",
          cookies,
          sessionid,
          username,
          password
        );
        sessionStorage.setItem("isAuthenticated", "true");
        navigate("/");
      } else {
        await login(
          "http://localhost:8000/api/login/",
          cookies,
          username,
          password
        );
        sessionStorage.setItem("isAuthenticated", "true");
        navigate("/");
      }
      localStorage.setItem("username", username);
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        setError(error.message);
      }
      sessionStorage.setItem("isAuthenticated", "false");
    }
  };

  return (
    <div className="login">
      <div className="wrapper">
        {error !== "" && <ErrorMessage text={error} />}
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <div className="input-box">
            <small></small>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              value={username}
              onChange={handleUsernameChange}
              required
            />
            <FaUser className="icon-login" />
          </div>
          <div className="input-box">
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            <FaLock className="icon-login" />
          </div>
          <p>
            <button type="submit">Login</button>
          </p>
          <div className="register-link">
            <p>
              Don't have an account?{" "}
              <Link to="/signup" className="register-link-Link">
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
