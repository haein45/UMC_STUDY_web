import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  height: 87%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  white-space: pre-line;
  background-color: #21234b;

  h1,
  h2,
  h3,
  a {
    font-size: 24px;
    font-weight: bold;
    color: white;
  }
`;

const NotFoundPage = () => {
  return (
    <>
      <Container>
        <h1>Oops!</h1>
        <h3>예상치 못한 에러가 발생했습니다; ;ㅁ;</h3>
        <h3>NOT FOUND</h3>
        <Link to="/">메인으로 이동하기</Link>
      </Container>
    </>
  );
};

export default NotFoundPage;
