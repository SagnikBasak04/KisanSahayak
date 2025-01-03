import { useEffect } from "react";
import { BsFillPlayCircleFill } from "react-icons/bs";
import AOS from "aos";
import "aos/dist/aos.css";

const About = () => {
  useEffect(() => {
    AOS.init({duration: 1000,delay: 300});
    AOS.refresh();
  }, []);
  return (
    <div className="about-section-container" data-aos="fade-up" id="about-section-container">
      <div className="about-background-image-container">
        <img src="/about-background.png" alt="bg" />
      </div>
      <div className="about-section-image-container">
        <img src="/looking-glass.png" alt="bg" />
      </div>
      <div className="about-section-text-container">
        <p className="primary-subheading">About</p>
        <h1 className="primary-heading">
          Crop Disease Prediction and Solutions
        </h1>
        <p className="primary-text">
          This is a collective motive to help farmers in various parts of India predinct potential crop disease outbreaks.
        </p>
        <p className="primary-text">
          Our website helps you take preventive actions and save the crop, increase yeild and lead to higher profit.
        </p>
        <div className="about-buttons-container">
          <a href="#contact-id"><button className="secondary-button">Learn More</button></a>
          <button className="watch-video-button">
            <BsFillPlayCircleFill /> Watch Video
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;