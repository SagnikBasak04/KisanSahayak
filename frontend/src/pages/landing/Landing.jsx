import "./Landing.css"
import About from "../../components/About";
import Work from "../../components/Work";
import Testimonial from "../../components/Testimonial";
import Contact from "../../components/Contact";
import Footer from "../../components/Footer";
import Layout from "../../components/Layout";
import Navbar from "../../components/navbars/Navbar";

const Landing = () => {
  return (
    <div className="landing">   
      <Navbar />
      <Layout/>
      <About />
      <Work />
      <Testimonial />
      <Contact />
      <Footer />
    </div>
  );
}

export default Landing;
