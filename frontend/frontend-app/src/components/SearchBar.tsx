import { ChangeEvent, FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import "../styles/searchbar.css";

const SearchBar: FC = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState<string>("");

  const handleOnClick = () => {
    if (sessionStorage.getItem("isAuthenticated") === "true") {
      navigate(`/destinations/?location=${location}`);
    } else {
      navigate("/login");
    }
  };
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLocation(event.target.value);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search..."
        className="search-input"
        onChange={handleChange}
      />
      <button className="search-button" onClick={handleOnClick}>
        <CiSearch />
      </button>
    </div>
  );
};

export default SearchBar;
