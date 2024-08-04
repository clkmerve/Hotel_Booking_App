

import React, { createContext, useContext, useState, useEffect } from 'react';

// Sepet bağlamını oluşturma
export const CartContext = createContext();

// Sepet bağlamını kullanma için bir öğe oluşturma
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// CartProvider bileşeni
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  // Sepete öğe ekleme
  const addToCart = (item) => {
    const cartItem = {
      ...item,
      cartItemId: `${item._id}-${new Date().getTime()}`, // Benzersiz cartItemId oluşturma
    };
    setCartItems([...cartItems, cartItem]);
  };

  // Sepetten öğe kaldırma
  const removeFromCart = (itemToRemove) => {
    const updatedCart = cartItems.filter((item) => item.cartItemId !== itemToRemove.cartItemId);
    setCartItems(updatedCart);
  };

  // Sepeti temizleme
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
