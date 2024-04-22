import { FC } from "react";
import { Link } from "react-router-dom";
import "../styles/button.css";

type ButtonType = {
  text: string;
  to: string;
};

const LoginButton: FC<ButtonType> = ({ text, to }) => {
  return (
    <Link to={to}>
      <button className="btn">{text}</button>
    </Link>
  );
};

export default LoginButton;
