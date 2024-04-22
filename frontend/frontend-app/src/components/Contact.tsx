import { FC } from "react";
import { FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import "../styles/contact.css";

const Contact: FC = () => {
  return (
    <div className="contact">
      <div className="contact-div">
        <h1>Contact Information</h1>
        <div className="icon-container">
          <FaPhone className="icon" />
        </div>
        <p>(413) 608 8013</p>
        <div className="icon-container">
          <MdEmail className="icon" />
        </div>
        <p>reservations@voyager.com</p>
        <div className="icon-container">
          <FaLocationDot className="icon" />
        </div>
        <p>132 Dartmouth Street Boston, Massachusetts 02156 United States</p>
      </div>
    </div>
  );
};

export default Contact;
