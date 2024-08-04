import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { EnvironmentFilled, HeartOutlined, HeartFilled } from '@ant-design/icons'; 
import './CityHotels.css';

const CityHotels = () => {
    const { cityId } = useParams();
    const [hotels, setHotels] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchHotels = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/hotels/city/${cityId}`);
                const data = await response.json();
                setHotels(data);
            } catch (error) {
                console.error('Error fetching hotels:', error);
            }
        };

        fetchHotels();
    }, [cityId]);

    const handleHotelClick = (hotelId) => {
        navigate(`/hotels/${hotelId}/rooms`);
    };

   

    return (
        <div className="hotels-container">
            {hotels.map(hotel => (
               <div
               key={hotel._id}
               className={`hotel-card ${hotel.selected ? 'selected' : ''}`}
               onClick={() => handleHotelClick(hotel._id)}
           >
                    <img src={hotel.img[0]} alt={hotel.name} className="hotel-img" onClick={() => handleHotelClick(hotel._id)} />
                    <div className="hotel-details">
                        <h3>{hotel.name}</h3>
                        <p>{hotel.description}</p>
                        <p><EnvironmentFilled /> {hotel.address}</p>
                        {/* <div className="favorite-icon" onClick={() => toggleFavorite(hotel._id)}>
                            {hotel.favorite ? <HeartFilled /> : <HeartOutlined />}
                        </div> */}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CityHotels;
