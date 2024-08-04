import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BiGlobe, BiHeart, BiShare } from "react-icons/bi";
import { MdLocationOn, MdRestaurantMenu, MdPool } from "react-icons/md";
import { FaWifi, FaCocktail } from "react-icons/fa";
import "./Info.css";

const Info = () => {
  const { hotelId } = useParams();
  const [hotel, setHotel] = useState(null);

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/hotels/${hotelId}` // Corrected line
        );
        const data = await response.json();
        setHotel(data);
      } catch (error) {
        console.error("Error fetching hotel:", error);
      }
    };

    if (hotelId) {
      fetchHotel();
    }
  }, [hotelId]);

  if (!hotel) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-info">
      <h1 className="product-title">{hotel.name}</h1>
      <div className="product-price">
        <strong className="new-price">{hotel.address}</strong>
      </div>
      <p className="product-description">{hotel.description}</p>

      <form className="variations-form">
        <div className="product-section">
          <MdRestaurantMenu className="product-icon" />
          <div className="product-details">
            <h3>Yemek Seçenekleri</h3>
            <p>
              Oteldeki restoranlarda çeşitli yemek seçenekleri sunulmaktadır.
              Detaylı bilgi için resepsiyon ile iletişime geçebilirsiniz.
            </p>
          </div>
        </div>
        <div className="product-section">
          <MdPool className="product-icon" />
          <div className="product-details">
            <h3>Otel Olanakları</h3>
            <p>
              Havuz, spa, fitness merkezi gibi çeşitli olanaklar sunulmaktadır.
              Detaylı bilgi için resepsiyon ile iletişime geçebilirsiniz.
            </p>
          </div>
        </div>

        <div className="product-section">
          <h3>Otel Hizmetleri</h3>
          <ul>
            <li>
              <FaWifi /> Ücretsiz WiFi
            </li>
            <li>
              <FaCocktail /> Minibar
            </li>
            <li> Oda servisi</li>
          </ul>
        </div>
      </form>
    </div>
  );
};

export default Info;
