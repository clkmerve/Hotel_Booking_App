import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // React Router Link import edildi
import './HotelList.css';

const HotelList = ({ filters }) => {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/hotels');
        const data = await response.json();
        setHotels(data);
      } catch (error) {
        console.error('Error fetching hotels:', error);
      } 
    };

    fetchHotels();
  }, []);

  const filteredHotels = hotels.filter(hotel => {
    return (
      (!filters.city || hotel.city.name.includes(filters.city)) &&
      (!filters.priceRange || hotel.price <= filters.priceRange)
    );
  });

  return (
    <div className="hotel-list-container">
      {filteredHotels.map(hotel => (
        <Link key={hotel._id} to={`/hotels/${hotel._id}/rooms`} className="hotel-link">
          <div className="hotel-card">
            <img src={hotel.img[0]} alt={hotel.name} className="hotel-image" />
            <h3 className="hotel-name">{hotel.name}</h3>
            <p className="hotel-description">{hotel.description}</p>
            <p className="hotel-address">{hotel.address}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default HotelList;
