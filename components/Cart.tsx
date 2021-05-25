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

type Total = {
  itemCount: number;
  price: number;
};

const Cart: FC<Props> = ({ cartItems, addToCart, removeFromCart, setCartOpen }) => {
  let isCartEmpty = cartItems.length === 0;

  let sum = cartItems.reduce(
    ({ itemCount, price }, cartItem) => {
      itemCount += cartItem.amount;
      price += cartItem.amount * cartItem.price;

      return { itemCount, price };
    },
    { itemCount: 0, price: 0 } as Total
  );

  return (
    <aside className="cart">
      <IconButton onClick={() => setCartOpen(false)} className="closeButton">
        <Close />
      </IconButton>
      <h2>Shopping Cart</h2>
      {isCartEmpty ? <p>no items in the cart</p> : null}
      {cartItems.map((item) => (
        <CartItem key={item.id} item={item} addToCart={addToCart} removeFromCart={removeFromCart} />
      ))}
      {!isCartEmpty ? (
        <p className="total">
          {sum.itemCount} {sum.itemCount > 1 ? 'items' : 'item'} cost ${sum.price} in total
        </p>
      ) : null}
    </aside>
  );
};

export default Cart;
