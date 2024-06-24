import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { increase, decrease, removeItem } from '../store/cartSlice';
import { ChevronUp, ChevronDown } from '../constants/icons';

const CartItem = ({ id, title, singer, price, img, amount }) => {
  const dispatch = useDispatch();

  return (
    <Wrapper>
      <img src={img} alt={title} />
      <div>
        <h4>{title}</h4>
        <h5>{singer}</h5>
        <h4>{price}₩</h4>
        <button onClick={() => dispatch(removeItem(id))}>Remove</button>
      </div>
      <div>
        <button onClick={() => dispatch(increase(id))}><ChevronUp /></button>
        <p>{amount}</p>
        <button onClick={() => dispatch(decrease(id))}><ChevronDown /></button>
      </div>
    </Wrapper>
  );
};

export default CartItem;

const Wrapper = styled.article`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ccc;

  img {
    width: 50px;
    height: 50px;
    object-fit: cover;
  }

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  button {
    background: none;
    border: none;
    cursor: pointer;
    svg {
      width: 20px;
      height: 20px;
    }
  }

  h4 {
    margin: 0;
  }

  h5 {
    margin: 5px 0;
    font-weight: normal;
  }

  p {
    margin: 0;
  }
`;
