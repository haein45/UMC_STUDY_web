import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increase, decrease, clearCart, calculateTotals, toggleModal, fetchCartItems } from '../store/cartSlice';
import { CartContainer, CartItem, CartItemInfo, QuantityControls, TotalContainer, ClearButton, ConfirmDialog, Overlay } from '../styles/styles';

const Cart = () => {
  const { cartItems, totalAmount, totalQuantity, showModal, status, error } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === 'idle') {
      console.log('Fetching cart items...'); // 로그 추가
      dispatch(fetchCartItems());
    }
  }, [status, dispatch]);

  useEffect(() => {
    console.log('Calculating totals...'); // 로그 추가
    dispatch(calculateTotals());
  }, [cartItems, dispatch]);

  console.log('Cart items:', cartItems); // cartItems 확인 로그

  const handleClearCart = () => {
    dispatch(clearCart());
    dispatch(toggleModal());
  };

  let content;

  if (status === 'loading') {
    content = <p>Loading...</p>;
  } else if (status === 'succeeded') {
    content = (
      <>
        {cartItems.map((item) => (
          <CartItem key={item.id}>
            <CartItemInfo>
              <img src={item.img} alt={item.title} />
              <div>
                <h4>{item.title}</h4>
                <p>{item.singer}</p>
                <p>{item.price}원</p>
              </div>
            </CartItemInfo>
            <QuantityControls>
              <button onClick={() => dispatch(decrease(item.id))}>-</button>
              <span>{item.amount}</span>
              <button onClick={() => dispatch(increase(item.id))}>+</button>
            </QuantityControls>
          </CartItem>
        ))}
        <TotalContainer>
          <div>
            <h2>총 가격: {totalAmount}원</h2>
            <h2>총 음반 수량: {totalQuantity}</h2>
          </div>
          <ClearButton onClick={() => dispatch(toggleModal())}>장바구니 초기화</ClearButton>
        </TotalContainer>
      </>
    );
  } else if (status === 'failed') {
    content = <p>{error}</p>;
  }

  return (
    <CartContainer>
      <h1>당신이 선택한 음반</h1>
      {content}
      {showModal && (
        <>
          <Overlay onClick={() => dispatch(toggleModal())} />
          <ConfirmDialog>
            <h2>담아두신 모든 음반을 삭제하시겠습니까?</h2>
            <div>
              <button className="confirm" onClick={handleClearCart}>네</button>
              <button className="cancel" onClick={() => dispatch(toggleModal())}>아니요</button>
            </div>
          </ConfirmDialog>
        </>
      )}
    </CartContainer>
  );
};

export default Cart;
