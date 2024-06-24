import React from 'react';
import { useSelector } from 'react-redux';
import CartItem from './CartItem';
import styled from 'styled-components';

const Cart = () => {
  const { items } = useSelector((state) => state.cart);

  return (
    <Wrapper>
      {items.map((item) => (
        <CartItem key={item.id} {...item} />
      ))}
    </Wrapper>
  );
};

export default Cart;

const Wrapper = styled.section`
  // your styled-components CSS
`;
