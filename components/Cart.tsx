import IconButton from '@material-ui/core/IconButton';
import { Close } from '@material-ui/icons';
import React, { FC } from 'react';
import { CartItemType } from '../pages';
import CartItem from './CartItem';

type Props = {
  cartItems: CartItemType[];
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
  setCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Cart: FC<Props> = ({ cartItems, addToCart, removeFromCart, setCartOpen }) => {
  return (
    <aside className="cart">
      <IconButton onClick={() => setCartOpen(false)} className="closeButton">
        <Close />
      </IconButton>
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? <p>no items in the cart</p> : null}
      {cartItems.map((item) => (
        <CartItem key={item.id} item={item} addToCart={addToCart} removeFromCart={removeFromCart} />
      ))}
    </aside>
  );
};

export default Cart;
