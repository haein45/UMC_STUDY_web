import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import SideBar from "./SideBar";
import Menu from "../assets/menu.png";

const Container = styled.div`
  padding: 19px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #171b39;
  color: white;

  a {
    color: white;
    text-decoration: none;
    margin: 0px 5px;
    line-height: 20px;

    &:hover {
      cursor: pointer;
      transform: scale(1.2);
      color: #e4b940;
      font-weight: bold;
    }
  }
`;

const LinkWrapper = styled.div``;

const SideMenu = styled.div`
  text-align: right;

  img {
    width: 28px;
  }

  &:hover {
    cursor: pointer;
  }
`;

const NavBar = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const [isOpen, setIsOpen] = useState(false);

  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Container>
      <Link
        to="/"
        onClick={() => {
          setIsOpen(false);
        }}
      >
        UMC Movie
      </Link>
      {width > 786 ? (
        <LinkWrapper>
          <Link to="/signup">회원가입</Link>
          <Link to="/login">로그인</Link>
          <Link to="/popular">Popular</Link>
          <Link to="/nowplaying">Now Playing</Link>
          <Link to="/toprated">Top Rated</Link>
          <Link to="/upcoming">Upcoming</Link>
        </LinkWrapper>
      ) : (
        <SideMenu onClick={handleSidebar}>
          <img src={Menu} alt="Menu" />
        </SideMenu>
      )}
      {isOpen && <SideBar onClick={handleSidebar} />}
    </Container>
  );
};

export default NavBar;