import { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { CartContext } from './Context';

function CartContextProvider({ children }) {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = useCallback(({ id, name, price, quantity }) => {
    const INVALID_INDEX = -1;
    const indexToUpdate = cart.findIndex((currProduct) => currProduct.productId === id);
    const subTotal = quantity * price;

    if (indexToUpdate !== INVALID_INDEX) {
      setCart((prevCart) => {
        const updatedCart = [...prevCart];
        updatedCart[indexToUpdate].quantity = quantity;
        updatedCart[indexToUpdate].subTotal = subTotal;
        return updatedCart;
      });
    } else {
      const newProductToAdd = {
        productId: id,
        name,
        unitPrice: price,
        quantity,
        subTotal,
      };
      setCart((prevCart) => [...prevCart, newProductToAdd]);
    }
  }, [cart]);

  function removeFromCart({ id }) {
    setCart((prevCart) => prevCart.filter((currP) => currP.productId !== id));
  }

  const updateCart = useCallback((product) => {
    if (product.quantity === 0) {
      removeFromCart(product);
    } else {
      addToCart(product);
    }
  }, [addToCart]);

  const cartTotal = useMemo(() => {
    const total = cart
      .reduce((acc, currentValue) => acc + currentValue.subTotal, 0).toFixed(2);
    return total;
  }, [cart]);

  const valueToProvide = useMemo(() => ({
    cartTotal,
    cart,
    updateCart,
  }), [cart, cartTotal, updateCart]);

  return (
    <CartContext.Provider value={ valueToProvide }>
      {children}
    </CartContext.Provider>
  );
}

CartContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CartContextProvider;
