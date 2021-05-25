import React, { FC } from 'react';
import Button from '@material-ui/core/Button';
//types
import { CartItemType } from '../pages/index';

type Props = {
  item: CartItemType;
  handleAddToCart: (clickedItem: CartItemType) => void;
};

const Item: FC<Props> = ({ item, handleAddToCart }) => (
  <div className="item">
    <div>
      <img src={item.image} alt={item.title} />
      <div>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        <h4>{item.price}</h4>
      </div>
    </div>
    <Button onClick={() => handleAddToCart(item)}>Add To Cart</Button>
  </div>
);

export default Item;
