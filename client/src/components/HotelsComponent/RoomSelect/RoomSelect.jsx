
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../../../context/CartProvider';
import { message } from 'antd'; 
import './RoomSelect.css';

const RoomSelect = () => {
  const { hotelId } = useParams();
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/hotels/${hotelId}/rooms`);
        const data = await response.json();
        setRooms(data.rooms);
      } catch (error) {
        console.error('Odaları getirirken hata oluştu:', error);
      }
    };

    if (hotelId) {
      fetchRooms();
    }
  }, [hotelId]);

  const handleRoomSelect = (room) => {
    if (!room.selected) {
      setSelectedRoom(room);
      setRooms((prevRooms) =>
        prevRooms.map((r) =>
          r._id === room._id ? { ...r, selected: true } : { ...r, selected: false }
        )
      );
    }
  };
  
  // addToCart fonksiyonu içinde ise oda eklenmeden önce selected özelliği kontrol edilebilir.
  

  const handleAddToCart = () => {
    if (selectedRoom && !selectedRoom.selected) {
      addToCart(selectedRoom);
      setSelectedRoom((prevRoom) => ({ ...prevRoom, selected: true }));
      message.success('Oda seçildi ve sepete eklendi.');
    } else {
      message.warning('Lütfen bir oda seçin.');
    }
  };
  
  return (
    <div className="rooms-page">
      <h1>Oda Seçin</h1>
      <div className="rooms-list">
        {rooms.map((room) => (
          <div
            key={room._id}
            className={`room-card ${selectedRoom && selectedRoom._id === room._id ? 'selected' : ''}`}
            onClick={() => handleRoomSelect(room)}
          >
            <div className="room-image">
              <img src={room.img} alt={room.roomName} />
            </div>
            <div className="room-details">
              <h3>{room.roomName}</h3>
              <p>{room.description}</p>
              <p>{room.price} TL</p>
            </div>
          </div>
        ))}
      </div>
      <button className="btn btn-lg btn-primary" onClick={handleAddToCart}>
       Rezervasyon Yap
      </button>
    </div>
  );
};

export default RoomSelect;
