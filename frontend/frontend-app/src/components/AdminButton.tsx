import { FC } from "react";
import "../styles/button.css";

const handleOnClick = () => {
  window.open("http://localhost:8000/admin/backend_app/destination/");
};

const AdminButton: FC = () => {
  return (
    <button className="btn" onClick={handleOnClick}>
      Admin
    </button>
  );
};

export default AdminButton;
