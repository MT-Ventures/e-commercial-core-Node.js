import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PopularProduct = () => {
  const [favorites, setFavorites] = useState(new Set());

  const handleFavorite = (productId) => {
    setFavorites((prevFavorites) => {
      const updatedFavorites = new Set(prevFavorites);
      if (updatedFavorites.has(productId)) {
        updatedFavorites.delete(productId);
      } else {
        updatedFavorites.add(productId);
      }
      return updatedFavorites;
    });
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    swipeToSlide: true,
    draggable: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          speed: 500,
          dots: true,
          nextArrow: null,
          prevArrow: null,
        },
      },
      {
        breakpoint: 600,
        settings: {
          infinite: true,
          dots: true,
          slidesToShow: 2,
          speed: 500,
          slidesToScroll: 2,
          initialSlide: 2,
          nextArrow: null,
          prevArrow: null,
        },
      },
      {
        breakpoint: 480,
        settings: {
          infinite: true,
          dots: true,
          speed: 500,
          slidesToShow: 1,
          slidesToScroll: 1,
          nextArrow: null,
          prevArrow: null,
        },
      },
    ],
  };

  const productData = [
    {
      id: 1,
      name: "HC Care Complex Bitkisel Saç Bakım Kompleksi - 100 ml",
      image: "https://via.placeholder.com/150",
      rating: 4.6,
      price: "439 TL",
    },
    {
      id: 2,
      name: "Bioxcin Keratin & Argan Onarıcı Saç Bakım Yağı 150 ml",
      image: "https://via.placeholder.com/150",
      rating: 4.7,
      price: "211 TL",
    },
    {
      id: 3,
      name: "Özlem Giyim Şifon Elbise",
      image: "https://via.placeholder.com/150",
      price: "849 TL",
    },
    {
      id: 4,
      name: "Ezem Store Katlanabilen Kadın Çantası",
      image: "https://via.placeholder.com/150",
      rating: 1.0,
      price: "549,90 TL",
    },
    {
      id: 5,
      name: "The Ceel Biberiye Yağı Kompleksi",
      image: "https://via.placeholder.com/150",
      rating: 4.5,
      price: "319,90 TL",
    },
  ];

  const products = productData.map((product) => (
    <div key={product.id} className="p-2 relative">
      <div className="bg-white border rounded-lg h-72 w-auto p-4 shadow-sm">
        <img src={product.image} alt={product.name} className="mb-2" />
        <p className="text-sm font-semibold">{product.name}</p>
        {product.rating && (
          <p className="text-yellow-500 font-semibold">{product.rating} ⭐</p>
        )}
        <p className="text-red-500 font-semibold">{product.price}</p>
      </div>
      <button
        onClick={() => handleFavorite(product.id)}
        className={`absolute top-2 right-2 p-2 rounded-full ${favorites.has(product.id) ? "bg-red-500 text-white" : "bg-white border border-gray-300 text-gray-600"}`}
      >
        {favorites.has(product.id) ? "❤️" : "🤍"}
      </button>
    </div>
  ));

  return (
    <section className="flex flex-col container mx-auto px-5 py-10">
      <div className="w-full p-4 bg-white rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Popüler Ürünler</h2>
        <Slider {...settings}>{products}</Slider>
      </div>
    </section>
  );
};

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        backgroundColor: "#1f2937",
        color: "#fff",
        borderRadius: "50%",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
        cursor: "pointer",
        transition: "background-color 0.3s ease",
      }}
      onClick={onClick}
    >
      &#129122;
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        borderRadius: "50%",
        backgroundColor: "black",
        cursor: "pointer",
        transition: "background-color 0.3s ease",
      }}
      onClick={onClick}
    >
      &#129120;
    </div>
  );
}

export default PopularProduct;
