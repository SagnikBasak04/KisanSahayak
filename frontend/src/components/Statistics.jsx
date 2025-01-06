import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const Testimonial = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, delay: 200 });
    AOS.refresh();
  }, []);

  function NextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "grey" }}
        onClick={onClick}
      />
    );
  }

  function PrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "grey" }}
        onClick={onClick}
      />
    );
  }

  const TestimonialData = [
    {
      image: "/Stat1.jpg"
    }, {
      image: "/Stat2.jpg"
    }, {
      image: "Stat3.jpg"
    }, {
      image: "Stat4.jpg"
    }, {
      image: "Stat5.jpg"
    }, {
      image: "Stat6.jpg"
    }, {
      image: "Stat7.jpg"
    }
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
    ]
  };

  return (
    <div className="work-section-wrapper" data-aos="fade-up" id="statistics-id">
      <div className="work-section-top">
        <h1 className="primary-heading">STATISTICS</h1>
        <p className="primary-text font-semibold text-4xl">
          Here's some statistics that could help you
        </p>
      </div>
      <Slider {...settings}>
        {TestimonialData.map((data, _idx) => (
          <div className="testimonial-section-bottom" key={_idx}>
            <img src={data.image} alt={_idx} style={{ width: "700px", height: "300px" }} />
            <p>{data.review}</p>
            <div className="testimonials-stars-container">
              {data.stars}
            </div>
            <h2>{data.name}</h2>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Testimonial;