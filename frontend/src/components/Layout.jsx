//import BannerBackground from "../assets/home-banner-background.png"
//import BannerImage from "../assets/home-banner-image.png";
import Typewriter from 'typewriter-effect';
import { useAuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import Translate from "./TranslateComponent.jsx";

const Layout = () => {
  const { authUser } = useAuthContext();
  const { loading, logout } = useLogout();

  return (
    <div className="home-container">

      <div className="home-banner-container">
        <div className="home-bannerImage-container">
          <img src="/home-banner-background.png" alt="" />
        </div>
        <div className="home-text-section">
          <h1 className="primary-heading" translate="no">
            <Typewriter
              options={{
                autoStart: true,
                loop: true
              }}
              onInit={(typewriter) => {
                typewriter
                  .typeString("Welcome")
                  .pause(3000)
                  .deleteAll()
                  .typeString("नमस्ते")
                  .pause(3000)
                  .deleteAll()
                  .typeString("নমস্কার")
                  .pause(3000)
                  .deleteAll()
                  .typeString("வணக்கம்")
                  .pause(3000)
                  .deleteAll()
                  .typeString("ನಮಸ್ಕಾರ")
                  .start()
              }}
            />
          </h1>

          <p className="primary-text">
            Keep your crops away from potential outbreaks and other problems
          </p>

          {!authUser ? (
            <div className="flex items-center justify-center gap-2">
              <button className="secondary-button">
                <Link to="/signup">Signup</Link>
              </button>
              <button className="primary-button">
                <Link to="/login">Login</Link>
              </button>
              <div
                style={{
                  width: "150px",
                  height: "100px",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  overflow: "hidden",
                  alignItems: "center",
                }}>
                <div>
                  <div>
                    <h1 style={{fontFamily:"Poppins"}}>Google Translate</h1>
                    <Translate />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <button className="secondary-button" onClick={logout}>
              {loading ? <span className="loading loading-spinner"></span> : "Logout"}
            </button>
          )}
        </div>
        <div className="home-image-section">
          <img src="/home-banner-image.png" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Layout;
