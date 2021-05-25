import React, { FC, useState } from 'react';
import { useQuery } from 'react-query';

// material ui components
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import LinearProgress from '@material-ui/core/LinearProgress';
import AddShoppingCart from '@material-ui/icons/AddShoppingCart';
import Badge from '@material-ui/core/Badge';

//Components
import Item from '../components/Item';
import Cart from '../components/Cart';

export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
};

const getProducts = async (): Promise<CartItemType[]> => {
  const res = await fetch('https://fakestoreapi.com/products');
  const data = await res.json();
  return data;
};

const Home: FC = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);
  const { data, isLoading, error } = useQuery<CartItemType[]>('products', getProducts);

  const getTotalItems = (items: CartItemType[]) => {
    return items.reduce((ack: number, item) => ack + item.amount, 0);
  };
  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartOpen(true);
    setCartItems((prev) => {
      //1. is the item already in the cart
      const isItemInCart = prev.find((item) => item.id === clickedItem.id);
      if (isItemInCart) {
        return prev.map((item) =>
          item.id === clickedItem.id ? { ...item, amount: item.amount + 1 } : item
        );
      }
      //2. first time the item is added
      return [...prev, { ...clickedItem, amount: 1 }];
    });
  };
  const handleRemoveFromCart = (id: number) => {
    setCartItems((prev) =>
      prev.reduce((ack, item) => {
        if (item.id === id) {
          if (item.amount === 1) return ack;
          return [...ack, { ...item, amount: item.amount - 1 }];
        } else {
          return [...ack, item];
        }
      }, [] as CartItemType[])
    );
  };

  if (isLoading) return <LinearProgress />;
  if (error) return <div>Some error happened but we don't know exactly!</div>;

  console.log(data);

  return (
    <div className="home">
      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart
          addToCart={handleAddToCart}
          cartItems={cartItems}
          removeFromCart={handleRemoveFromCart}
          setCartOpen={setCartOpen}
        />
      </Drawer>
      <IconButton onClick={() => setCartOpen(true)} className="cartButton">
        <Badge badgeContent={getTotalItems(cartItems)} color="primary">
          <AddShoppingCart />
        </Badge>
      </IconButton>
      <div className="itemsWrapper">
        {data?.map((item) => (
          <Item key={item.id} handleAddToCart={handleAddToCart} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Home;
