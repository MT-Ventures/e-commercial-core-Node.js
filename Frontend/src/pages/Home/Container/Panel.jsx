import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const settings = {
  dots: true,
  arrows: false,
  swipeToSlide: true,
  draggable: true,
  infinite: true,
  speed: 500,
  infinite: true,
  autoplay: true,
  speed: 2000,
  autoplaySpeed: 4000,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const imageUrls = [
  "https://via.placeholder.com/800x600.png?text=Panel+1",
  "https://via.placeholder.com/800x600.png?text=Panel+2",
  "https://via.placeholder.com/800x600.png?text=Panel+3",
];
const Panel = () => {
  return (
    <section className="flex flex-col container mx-auto px-5 py-10">
      <div className="w-full">
        <Slider {...settings}>
          {imageUrls.map((url, index) => (
            <div
              key={index}
              className="flex items-center justify-center h-96 bg-gray-200 border border-gray-300"
            >
              <img
                src={url}
                alt={`Panel ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}

export default Panel
