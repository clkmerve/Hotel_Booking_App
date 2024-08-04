import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartProvider";
import "./Cart.css";
import CartTotals from "./CartTotals";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Cart = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const [selectedDates, setSelectedDates] = useState({});
  const [showDatePicker, setShowDatePicker] = useState({});

  const handleRemoveFromCart = (item) => {
    removeFromCart(item);
  };

  const handleClearCart = () => {
    clearCart();
  };

  const toggleDatePicker = (itemId) => {
    setShowDatePicker((prevState) => ({
      ...prevState,
      [itemId]: !prevState[itemId],
    }));
  };

  const handleDateChange = (dates, item) => {
    const [start, end] = dates;

    setSelectedDates((prevDates) => ({
      ...prevDates,
      [item.cartItemId]: { startDate: start, endDate: end },
    }));

    // Toggle yapmadan sadece seçilmiş tarihleri güncellemek için:
    // setShowDatePicker(prevState => ({ ...prevState, [item.cartItemId]: true }));
  };

  return (
    <div className="cart-page">
      <div>
        <h1>Alışveriş Sepeti</h1>
        {cartItems.length === 0 ? (
          <p>Sepetiniz boş.</p>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item.cartItemId} className="cart-item">
                  <div className="cart-item-details">
                    <h3>{item.roomName}</h3>
                    <p>{item.description}</p>
                    <p>{item.price} TL</p>
                    <img src={item.img} alt="" width="100px" />
                  </div>

                  <button
                    className="btn4"
                    onClick={() => toggleDatePicker(item.cartItemId)}
                  >
                    Kalınacak Gece Sayısı Ekle
                  </button>

                  {showDatePicker[item.cartItemId] && (
                    <DatePicker
                      selected={selectedDates[item.cartItemId]?.startDate}
                      onChange={(dates) => handleDateChange(dates, item)}
                      startDate={selectedDates[item.cartItemId]?.startDate}
                      endDate={selectedDates[item.cartItemId]?.endDate}
                      selectsRange
                      inline
                    />
                  )}

                  <button
                    className="btn1"
                    onClick={() => handleRemoveFromCart(item)}
                  >
                    Kaldır
                  </button>
                </div>
              ))}
            </div>

            <button className="btn2" onClick={handleClearCart}>
              Sepeti Temizle
            </button>

            <Link to="/checkout" className="btn3">
              Satın Almaya Devam Et
            </Link>
          </>
        )}
      </div>

      <div className="cart-collaterals">
        <CartTotals cartItems={cartItems} selectedDates={selectedDates} />
      </div>
    </div>
  );
};

export default Cart;