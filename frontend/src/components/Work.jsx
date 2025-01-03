import Camera from "../../public/camera-clip-art-orange.png";
import LookingGlass from "../../public/looking-glass-work.png";
import BarGraph from "../../public/bar-graph.png";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Work = () => {
  useEffect(() => {
    AOS.init({duration: 1000,delay: 300});
    AOS.refresh();
  }, []);
  const workInfoData = [
    {
      image: Camera,
      title: "Upload or Capture Image",
      text: "SignUp and upload or capture image of diseased crop to our website.",
    },
    {
      image: LookingGlass,
      title: "Prediction",
      text: "Accurate prediction of the possible diseases considering soil and rainfall conditions of your location",
    },
    {
      image: BarGraph,
      title: "Solution",
      text: "Real and effective solution to the predicted disease.",
    },
  ];
  
  return (
    <div className="work-section-wrapper" data-aos="fade-up">
      <div className="work-section-top">
        <p className="primary-subheading">Work</p>
        <h1 className="primary-heading">How It Works</h1>
        <p className="primary-text">
          Simple and user-friendly three step process to save your crop.
        </p>
      </div>
      <div className="work-section-bottom">
        {workInfoData.map((data) => (
          <div className="work-section-info" key={data.title}>
            <div className="info-boxes-img-container">
              <img src={data.image} alt="" />
            </div>
            <h2>{data.title}</h2>
            <p>{data.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Work;