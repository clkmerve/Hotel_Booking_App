
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { EnvironmentFilled } from '@ant-design/icons'; 

import './City.css';

const City = () => {
    const [cities, setCities] = useState([]);
    const [filteredCities, setFilteredCities] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const fetchCities = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/cities');
                const data = await response.json();
                setCities(data);
                setFilteredCities(data);
            } catch (error) {
                console.error('Error fetching cities:', error);
            }
        };

        fetchCities();
    }, []);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const cityname = searchParams.get('cityname');

        if (cityname) {
            setFilteredCities(
                cities.filter(city => {
                    const cityName = city.name ? city.name.toLowerCase() : '';
                    const search = cityname.toLowerCase();
                    return cityName.includes(search);
                })
            );
        } else {
            setFilteredCities(cities);
        }
    }, [location.search, cities]);

    const handleCityClick = (cityId) => {
        navigate(`/city/${cityId}`);
    };

    return (
        <div className="city-search-container">
            {/* <input
                type="text"
                placeholder="Şehir ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="city-search-input"
            /> */}
            <div className="cities-container">
                {filteredCities.map(city => (
                    <div key={city._id} className="city-card" onClick={() => handleCityClick(city._id)}>
                        <img src={city.img} alt={city.name} className="city-img" />
                        <div className="city-name">{city.name}</div>
                        <div className="city-country"><EnvironmentFilled /> {city.country}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default City;
