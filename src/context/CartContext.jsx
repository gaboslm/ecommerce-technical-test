import { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Add item to cart (accumulate quantity if already exists)
  const addItem = (item, quantity) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem
        );
      }
      
      return [...prevCart, { ...item, quantity }];
    });
  };

  // Remove item from cart
  const removeItem = (itemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
  };

  // Clear entire cart
  const clear = () => {
    setCart([]);
  };

  // Check if item is in cart
  const isInCart = (id) => {
    return cart.some((item) => item.id === id);
  };

  // Get total quantity of items in cart
  const getCartQuantity = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  // Get total price of cart
  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        removeItem,
        clear,
        isInCart,
        getCartQuantity,
        getCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
