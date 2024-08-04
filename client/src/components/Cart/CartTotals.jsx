import React, { useState } from 'react';
import { Spin, message } from 'antd';
import { useNavigate } from 'react-router-dom';

const CartTotals = ({ cartItems, selectedDates }) => {
  const [fastCargoChecked, setFastCargoChecked] = useState(false);
  const [showAddressInput, setShowAddressInput] = useState(false);
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

  const calculateDays = (startDate, endDate) => {
    if (!startDate || !endDate) return 0;
    const timeDiff = Math.abs(endDate - startDate);
    return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  };

  const cartItemTotals = cartItems.map((item) => {
    const { startDate, endDate } = selectedDates[item.cartItemId] || {};
    const days = calculateDays(startDate, endDate);
    return days * item.price;
  });

  const subTotals = cartItemTotals.reduce((acc, val) => acc + val, 0);
  const cargoFee = 300;
  const cartTotals = fastCargoChecked ? (subTotals + cargoFee).toFixed(2) : subTotals.toFixed(2);

  const handlePayment = async () => {
    setLoading(true);
    if (!user) {
      message.info('Ödeme yapabilmek için giriş yapmalısınız!');
      setLoading(false);
      return;
    }
    if (showAddressInput && !address.trim()) {
      message.error('Adres boş bırakılamaz.');
      setLoading(false);
      return;
    }
    const body = {
      Rooms: cartItems.map((item) => {
        const { startDate, endDate } = selectedDates[item.cartItemId] || {};
        const days = calculateDays(startDate, endDate);
        return { ...item, quantity: days };
      }),
      user: user,
      cargoFee: fastCargoChecked ? cargoFee : 0,
      address: showAddressInput ? address.trim() : null,
    };

    // Simulate an API call for the payment
    setTimeout(() => {
      setLoading(false);
      message.success('Ödemeniz gerçekleştirildi.');
      navigate('/success');
    }, 2000);
  };

  return (
    <div className="cart-totals">
      <h2>Sepet Toplamı</h2>
      <table>
        <tbody>
          <tr className="cart-subtotal">
            <th>Toplam</th>
            <td>
              <span id="subtotal">{subTotals.toFixed(2)}₺</span>
            </td>
          </tr>
          <tr>
            <th></th>
            <td>
              <ul>
                <li>
                  <label>
                    Oda Servisi: 300.00₺
                    <input
                      type="checkbox"
                      id="fast-cargo"
                      checked={fastCargoChecked}
                      onChange={() => setFastCargoChecked(!fastCargoChecked)}
                    />
                  </label>
                </li>
                <li>
                  <a href="#" onClick={() => setShowAddressInput(true)}>
                    Adres Ekle
                  </a>
                  {showAddressInput && (
                    <input
                      type="text"
                      placeholder="Adresiniz"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  )}
                </li>
              </ul>
            </td>
          </tr>
          <tr>
            <th>Tutar</th>
            <td>
              <strong id="cart-total">{cartTotals}₺</strong>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="checkout">
        <Spin spinning={loading}>
          <button className="btn btn-lg" onClick={handlePayment}>
            Rezervasyon yap
          </button>
        </Spin>
      </div>
    </div>
  );
};

export default CartTotals;
