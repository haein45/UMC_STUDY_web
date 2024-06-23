import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  position: fixed;
  top: 8%;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #25294b;
`;

const BarWrapper = styled.div`
  position: absolute;
  display: grid;
  grid-template-columns: 1fr;
  padding: 8px 8px;

  a {
    padding: 18px 10px;
    font-size: 18px;
    font-weight: bold;
  }
`;

const SideBar = (onClick) => {
  return (
    <Container onClick={onClick.onClick}>
      <BarWrapper>
        <Link to="/signup">회원가입</Link>
        <Link to="/popular">Popular</Link>
        <Link to="/nowplaying">Now Playing</Link>
        <Link to="/toprated">Top Rated</Link>
        <Link to="/upcoming">Upcoming</Link>
      </BarWrapper>
    </Container>
  );
};

export default SideBar;
