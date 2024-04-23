import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const API = "https://api.escuelajs.co/api/v1/products";

const Home = () => {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios
      .get(API)
      .then((res) => {
        setData(res.data);
        setLoader(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }, []);

  const dispatch = useDispatch();

  const addCart = (options) => {
    dispatch({ type: "addToCart", payload: options });
    dispatch({ type: "calculation" });
    toast.success("Added To Cart");
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter products based on search query
  const filteredProducts = data.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="home">
      <input
        type="text"
        id="searchBox"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleSearchInputChange}
      />
      {loader ? (
        <Loader />
      ) : (
        filteredProducts.map((product) => (
          <ProductCart
            key={product.id}
            id={product.id}
            imgSrc={product.images}
            price={product.price}
            title={product.title}
            description={product.description}
            handler={addCart}
          />
        ))
      )}
    </main>
  );
};

// THIS IS THE CSS SETTING FOR SLIDER
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true, // Autoplay enabled
  autoplaySpeed: 4000, // Autoplay speed in milliseconds (optional)
};

const ProductCart = ({ id, imgSrc, price, description, title, handler }) => {
  return (
    <div className="ProductCart">
      <div>
        <Slider {...settings}>
          {imgSrc.map((img, index) => (
            <img key={index} src={img} alt={`Image ${index}`} />
          ))}
        </Slider>
      </div>
      <h4>{title}</h4>
      <h5>$ {price}</h5>
      <p className="desc">{description}</p>
      <button
        className="btn-button"
        onClick={() =>
          handler({ title, description, price, qty: 1, id, imgSrc })
        }
      >
        Add To Cart
      </button>
    </div>
  );
};

export default Home;
