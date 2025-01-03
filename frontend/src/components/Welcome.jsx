import BannerImage from "../../public/tutorial.gif";
import Typewriter from 'typewriter-effect';
import getSalutation from "../utils/getSalutation";
import { useAuthContext } from "../context/AuthContext";

const Welcome = () => {
  const salutation = getSalutation();
  const { authUser } = useAuthContext();

  return (

      <div className="home-banner-container">
        <div className="home-text-section">
          <h1 className="primary-heading" translate="no">
            <Typewriter
              options={{
                autoStart: true,
                loop: true
              }}
              onInit={(typewriter) => {
                typewriter
                  .typeString(`${salutation}!`)
                  .pause(10000)
                  .deleteAll()
                  .start()
              }}
            />
          </h1>
          <p className="primary-text font-semibold text-4xl md:text-3xl sm:text-2xl">
            WELCOME, {authUser?.name}
          </p>
        </div>
        <div className="home-image-section">
          <img src={BannerImage} alt="" />
        </div>
      </div>
  );
};

export default Welcome;