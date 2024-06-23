// src/styles/styles.js
import styled from 'styled-components';

export const CartContainer = styled.div`
  width: 80%;
  margin: 0 auto;
  padding: 2rem;
  background-color: #f7f7f7;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

export const CartItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  padding: 1rem 0;
`;

export const CartItemInfo = styled.div`
  display: flex;
  align-items: center;

  img {
    width: 50px;
    height: 50px;
    margin-right: 1rem;
    border-radius: 5px;
  }
`;

export const QuantityControls = styled.div`
  display: flex;
  align-items: center;

  button {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.5rem;
    margin: 0 0.5rem;
  }

  span {
    margin: 0 1rem;
    font-size: 1.2rem;
  }
`;

export const TotalContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  font-size: 1.2rem;

  button {
    padding: 0.5rem 1rem;
    background-color: #ff6b6b;
    border: none;
    border-radius: 5px;
    color: white;
    cursor: pointer;
  }
`;

export const ClearButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #ff6b6b;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
`;

export const ConfirmDialog = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
  z-index: 1000;

  h2 {
    margin-bottom: 1rem;
  }

  div {
    display: flex;
    justify-content: space-around;
    margin-top: 1rem;
  }

  button {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  .confirm {
    background-color: #4caf50;
    color: white;
  }

  .cancel {
    background-color: #f44336;
    color: white;
  }
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;
