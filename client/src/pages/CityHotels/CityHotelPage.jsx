import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header';
import CityHotels from '../../components/HotelsComponent/CityHotels/CityHotels';

const CityHotelPage = () => {
    const [selectedCity, setSelectedCity] = useState('');
    const { cityId } = useParams();

    useEffect(() => {
        const fetchCity = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/cities/${cityId}`);
                if (!response.ok) {
                    throw new Error('Şehir bilgisi getirilemedi');
                }
                const cityData = await response.json();
                setSelectedCity(cityData.name);
            } catch (error) {
                console.error('Hata:', error);
            }
        };

        if (cityId) {
            fetchCity();
        }
    }, [cityId]);

    return (
        <div>
            <Header />
            <h2 style={{ textAlign: "center", marginTop: "20px" }}>
                {selectedCity ? `${selectedCity} Otelleri` : 'Oteller'}
            </h2>
            <CityHotels />
        </div>
    );
};

export default CityHotelPage;
