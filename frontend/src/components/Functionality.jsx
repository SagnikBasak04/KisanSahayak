import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Functionality = () => {
  const buttonContainerRef = useRef(null);

  useEffect(() => {
    const buttons = buttonContainerRef.current.children;

    // Setting initial position for buttons to be off-screen (to the right)
    gsap.set(buttons, { x: 1000 });

    // Creating GSAP timeline for rushing animation
    gsap.timeline({
      scrollTrigger: {
        trigger: buttonContainerRef.current,
        start: "top 80%", // Starting animation when the container enters the viewport
        end: "bottom top", // Continue animation until container exits the viewport
        toggleActions: "play none none reverse", // Playing on enter, reverse on exit
      },
    })
      .to(buttons, {
        x: 0,
        duration: 0.3,
        ease: "power4.in",
        stagger: 0.2,
      });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill()); // Cleanup on unmount
    };
  }, []);

  return (
    <div className="contact-page-wrapper flex flex-col items-center justify-center min-h-screen" id="contact-id">
      <h1 className="primary-heading text-center mb-8" id="new-activities-id">
        NEW ACTIVITIES
      </h1>
      <h2 className="primary-text font-semibold text-4xl">Choose your next step</h2>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-4xl justify-items-center"
        ref={buttonContainerRef}
      >
        <button className="primary-button-new w-full">
          <Link to="/upload" className="w-full block text-center">
            Upload
          </Link>
        </button>
        <button className="primary-button-new w-full">
          <Link to="/capture" className="w-full block text-center">
            Capture
          </Link>
        </button>
        <button className="primary-button-new w-full">
          <Link to="/dashboard" className="w-full block text-center">
            Dashboard
          </Link>
        </button>
        <button className="primary-button-new w-full">
          <Link to="/marketplace" className="w-full block text-center">
            Marketplace
          </Link>
        </button>
        <button className="primary-button-new w-full">
          <Link to="/history" className="w-full block text-center">
            My History
          </Link>
        </button>
        <button className="primary-button-new w-full">
          <Link to="/elevated-user/contribute" className="w-full block text-center">
            Contribute
          </Link>
        </button>
        <button className="primary-button-new w-full">
          <Link to="/profile" className="w-full block text-center">
            Profile
          </Link>
        </button>
        <button className="primary-button-new w-full">
          <Link to="/info" className="w-full block text-center">
            Details & Info
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Functionality;