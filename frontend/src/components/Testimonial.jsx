import ProfilePic from "../assets/john-doe-image.png";
import { AiFillStar } from "react-icons/ai";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const Testimonial = () => {
  useEffect(() => {
    AOS.init({duration: 1000,delay: 300});
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
      image: ProfilePic,
      review: "Best Decision for my Paddy Fields!This website has been a blessing for my paddy farming. The disease predictions are incredibly accurate, and the advice is tailored to local conditions here in Andhra Pradesh. Thanks to this service, I caught a fungal infection early, and it saved my entire crop. Its a must-have tool for every Indian farmer! ",
      stars: 
      <>
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
      </>,
      name: "Anil K., Paddy Farmer, Andhra Pradesh"
    },
    {
      image: ProfilePic,
      review: "This service has made managing my sugarcane farm so much easier. The disease prediction system is accurate, and it uses weather data from my region to give real-time updates. I love how it’s customized for Indian crops and conditions. I’ve been able to take action before any major disease outbreak hits my fields. ",
      stars: 
      <>
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
      </>,
      name: "Rahul P., Sugarcane Farmer, Uttar Pradesh"
    },
    {
      image: ProfilePic,
      review: "As a small farmer, I don’t have the resources to consult experts regularly. This website provides everything I need in one place, from early warnings of diseases to specific advice on how to protect my vegetables. The site is easy to navigate, and the tips are practical. It has made a big difference in the health of my crops! ",
      stars: 
      <>
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
      </>,
      name: "Neha S., Vegetable Farmer, Karnataka"
    },{
      image: ProfilePic,
      review: "The disease forecasts are spot on, and the website offers practical solutions for each stage of the crop cycle. I was able to prevent a major infestation of bollworm on my cotton crop by following the prevention strategies recommended on the site. It’s a powerful tool for Indian farmers who want to stay ahead of crop diseases. ",
      stars: 
      <>
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
      </>,
      name: "Ravi M., Cotton Farmer, Gujarat"
    },{
      image: ProfilePic,
      review: "Tea crops are highly vulnerable to diseases, and this website has been a fantastic resource for managing them. The prediction system is very accurate, and the tips are easy to follow. I’ve been able to prevent major outbreaks of blister blight and leaf rust, which saved me a lot of money. Every plantation owner in India should be using this service! ",
      stars: 
      <>
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
      </>,
      name: "Preeti T., Tea Plantation Owner, Assam"
    },{
      image: ProfilePic,
      review: "Wheat farming comes with its challenges, but this website has made disease management so much easier. The localized predictions and practical advice have helped me avoid rust and other common diseases. It's built with Indian farmers in mind, and I appreciate the fact that it’s available in regional languages. Highly recommended! ",
      stars: 
      <>
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
      </>,
      name: "Devinder S., Wheat Farmer, Punjab"
    },
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
    <div className="work-section-wrapper" data-aos="fade-up" id="testimonial-id">
      <div className="work-section-top">
        <p className="primary-subheading">Testimonial</p>
        <h1 className="primary-heading">Say Something</h1>
        <p className="primary-text">
          Here are some reviews by our service users.
        </p>
      </div>
      <Slider {...settings}>
      {TestimonialData.map((data, _idx) => (
          <div className="testimonial-section-bottom">
            <img src={data.image} alt={_idx} />
            <p>{data.review}</p>
            <div className="testimonials-stars-container">
              {data.stars}
            </div>
            <h2>{data.name}</h2>
          </div>
        ))}
        </Slider>
        {/*<img src={ProfilePic} alt="" />
        <p>
          Lorem ipsum dolor sit amet consectetur. Non tincidunt magna non et
          elit. Dolor turpis molestie dui magnis facilisis at fringilla quam.
        </p>
        <div className="testimonials-stars-container">
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
        </div>
        <h2>John Doe</h2>*/}
    </div>
  );
};

export default Testimonial;