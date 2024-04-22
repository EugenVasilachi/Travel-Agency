import { FC } from "react";
import "../styles/about.css";

const About: FC = () => {
  return (
    <div className="about">
      <div className="about-container">
        <h1>About Us</h1>
        <p>
          Welcome to our travel agency! We are dedicated to providing
          exceptional travel experiences to our customers.
        </p>
        <p>
          Our mission is to make travel planning easy, affordable, and enjoyable
          for everyone.
        </p>
        <p>
          Whether you're looking for flights, hotels, vacation packages, or car
          rentals, we've got you covered. Our team of experienced travel experts
          is here to assist you every step of the way.
        </p>
        <p>
          Thank you for choosing us for your travel needs. We look forward to
          helping you create unforgettable memories!
        </p>
      </div>
    </div>
  );
};

export default About;
