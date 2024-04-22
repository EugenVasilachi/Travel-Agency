import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../utils/http";
import "../styles/button.css";

type ButtonType = {
  text: string;
  to: string;
};

const LogoutButton: FC<ButtonType> = ({ text, to }) => {
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      await logout("http://localhost:8000/api/logout/");
      sessionStorage.setItem("isAuthenticated", "false");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Link to={to}>
      <button className="btn" onClick={handleClick}>
        {text}
      </button>
    </Link>
  );
};

export default LogoutButton;
