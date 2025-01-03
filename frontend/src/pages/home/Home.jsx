import { useState, useEffect } from "react";
import Welcome from "../../components/Welcome";
import NavbarHome from "../../components/navbars/Navbar-home";
import Statistics from "../../components/Statistics";
import Functionality from "../../components/Functionality";
import Contact from "../../components/Contact";
import Footer from "../../components/Footer";
import Spinner2 from "../../components/Spinner2";
import ParticlesContainer from "../../components/ParticlesContainer.jsx"
import "./Home.css";

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer); // cleanup on unmount
  }, []);

  if (loading) {
    return (
      <div className="mt-20">
        <Spinner2 />
      </div>
    )
  }

  return (
    <div className="home">   
      <NavbarHome />
      <ParticlesContainer/>
      <Welcome />
      <Statistics />
      <Functionality />
      <Contact />
      <Footer />
    </div>
  );
}

export default Home;