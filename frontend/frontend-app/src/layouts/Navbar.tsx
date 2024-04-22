import { FC, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import LoginButton from "../components/LoginButton";
import { SiYourtraveldottv } from "react-icons/si";
import "../styles/navbar.css";
import Dropdown from "./Dropdown";
import SearchBar from "../components/SearchBar";
import LogoutButton from "../components/LogoutButton";
import AdminButton from "../components/AdminButton";

const Navbar: FC = () => {
  const [dropdown, setDropdown] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState("");
  const location = useLocation();

  const onMouseEnter = () => {
    setDropdown(true);
  };

  const onMouseLeave = () => {
    setDropdown(false);
  };

  useEffect(() => {
    const isAuthenticatedStr = sessionStorage.getItem("isAuthenticated");
    isAuthenticatedStr === "true"
      ? setIsAuthenticated(true)
      : setIsAuthenticated(false);
    const localRole = localStorage.getItem("role");
    if (localRole) {
      setRole(localRole);
    } else {
      setRole("");
    }
  }, [location]);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/" className="navbar-logo">
          Voyager
        </Link>
        <SiYourtraveldottv className="icon" />
      </div>
      <ul className="nav-menu">
        <li className="nav-item">
          {sessionStorage.getItem("isAuthenticated") === "true" ? (
            <Link to="/About" className="nav-links">
              About
            </Link>
          ) : (
            <Link to="/Login" className="nav-links">
              About
            </Link>
          )}
        </li>
        <li className="nav-item">
          {sessionStorage.getItem("isAuthenticated") === "true" ? (
            <Link to="/Contact" className="nav-links">
              Contact
            </Link>
          ) : (
            <Link to="/Login" className="nav-links">
              Contact
            </Link>
          )}
        </li>
        <li
          className="nav-item"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          {sessionStorage.getItem("isAuthenticated") === "true" ? (
            <>
              <Link to="/destinations" className="nav-links">
                Destinations <i className="fas fa-caret-down" />
              </Link>
              {dropdown && <Dropdown />}
            </>
          ) : (
            <Link to="/Login" className="nav-links">
              Destinations
            </Link>
          )}
        </li>
        <li className="nav-item">
          <SearchBar />
        </li>
      </ul>
      {isAuthenticated ? (
        <LogoutButton text="Logout" to="/" />
      ) : (
        <LoginButton text="Login" to="/login" />
      )}
      {role === "admin" && <AdminButton />}
    </nav>
  );
};

export default Navbar;
