import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './City.css';

const HomeCity = () => {
    const [cities, setCities] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCities = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/cities');
                const data = await response.json();
                setCities(data.slice(0, 8));  // İlk 8 şehri alın
            } catch (error) {
                console.error('Error fetching cities:', error);
            }
        };

        fetchCities();
    }, []);

    const handleCityClick = (cityId) => {
        navigate(`/city/${cityId}`);
    };

    return (
        <div className="cities-container">
            {cities.map(city => (
                <div key={city._id} className="city-card" onClick={() => handleCityClick(city._id)}>
                    <img src={city.img} alt={city.name} className="city-img" />
                    <div className="city-name">{city.name}</div>
                </div>
            ))}
        </div>
    );
};

export default HomeCity;
