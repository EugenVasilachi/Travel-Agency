import "../styles/home.css";
import video from "../assets/videos/video-1.mp4";

const Home = () => {
  return (
    <div className="home">
      <video src={video} autoPlay loop muted />
      <div className="home-big">
        <h5>Discover Your Life, Travel</h5>
        <h6>Where You Want</h6>
      </div>
      <div className="home-text">
        <p style={{ fontSize: "1.5rem" }}>
          Explore nature's paradise. Find your dream destination with us,
        </p>
        <p style={{ fontSize: "1.5rem" }}>
          from secluded beaches to majestic mountains
        </p>
      </div>
    </div>
  );
};

export default Home;
