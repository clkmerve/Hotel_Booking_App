
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./Gallery.css";

const Gallery = () => {
  const { hotelId } = useParams();
  const [hotel, setHotel] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/hotels/${hotelId}`);
        const data = await response.json();
        setHotel(data);
        setSelectedImage(data.img[0]); // Set the first image as the default selected image
      } catch (error) {
        console.error('Error fetching hotel:', error);
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
    <div className="product-gallery">
      <div className="single-image-wrapper">
        <img src={selectedImage} alt={hotel.name} className="img-fluid" id="single-image" />
      </div>
      <div className="product-thumb">
        <div className="glide__track" data-glide-el="track">
          <ol className="gallery-thumbs glide__slides">
            {hotel.img.map((thumbnail, index) => (
              <li
                key={index}
                className={`glide__slide ${thumbnail === selectedImage ? 'glide__slide--active' : ''}`}
                onClick={() => setSelectedImage(thumbnail)}
              >
                <img
                  src={thumbnail}
                  alt={`Thumbnail ${index + 1}`}
                  className={`img-fluid ${thumbnail === selectedImage ? 'active' : ''}`}
                />
              </li>
            ))}
          </ol>
        </div>
        <div className="glide__arrows" data-glide-el="controls">
          <button className="glide__arrow glide__arrow--left" data-glide-dir="<">
            <i className="bi bi-chevron-left"></i>
          </button>
          <button className="glide__arrow glide__arrow--right" data-glide-dir=">">
            <i className="bi bi-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
