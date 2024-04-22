import { useState, ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import ErrorMessage from "./ErrorMessage";
import "../styles/login.css";
import Cookies from "universal-cookie";
import { register } from "../utils/http";

const SignUp = () => {
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const cookies = new Cookies();

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handlePhoneChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPhone(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await register(
        "http://localhost:8000/api/register/",
        cookies,
        username,
        password,
        email,
        phone
      );
      sessionStorage.setItem("isAuthenticated", "true");
      navigate("/");
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        setError(error.message);
      }
      sessionStorage.setItem("isAuthenticated", "false");
    }
  };

  return (
    <div className="signup">
      <div className="wrapper">
        {error !== "" && <ErrorMessage text={error} />}
        <form onSubmit={handleSubmit}>
          <h1>Sign Up</h1>
          <div className="input-box">
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
              required
            />
            <MdEmail className="icon-login" />
          </div>
          <div className="input-box">
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
              type="text"
              id="phone"
              name="phone"
              placeholder="Phone number"
              value={phone}
              onChange={handlePhoneChange}
              required
            />
            <FaPhone className="icon-login" />
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
            <button type="submit">Register</button>
          </p>
          <div className="register-link">
            <p>
              Already have an account?{" "}
              <Link to="/login" className="register-link-Link">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
