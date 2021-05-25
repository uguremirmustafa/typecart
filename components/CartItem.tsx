import React, { FC } from 'react';
import Button from '@material-ui/core/Button';

import { CartItemType } from '../pages';

type Props = {
  item: CartItemType;
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
};

const CartItem: FC<Props> = ({ addToCart, item, removeFromCart }) => {
  return (
    <div className="cartItem">
      <h3>{item.title}</h3>
      <img src={item.image} alt={item.title} />
      <div className="information">
        <p>Price: ${item.price}</p>
        {/* check what happens without toFixed */}
        <p>Total: ${(item.amount * item.price).toFixed(2)}</p>
      </div>
      <div className="buttons">
        <Button
          size="small"
          disableElevation
          variant="contained"
          onClick={() => removeFromCart(item.id)}
        >
          -
        </Button>
        <p>{item.amount}</p>
        <Button size="small" disableElevation variant="contained" onClick={() => addToCart(item)}>
          +
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
