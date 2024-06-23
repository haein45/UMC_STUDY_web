import React from "react";
import styled from "styled-components";

const Container = styled.div`
  padding: 15px;
  text-align: right;
  font-size: 12px;
  color: white;
  background-color: black;

  a {
    color: white;
  }
`;

const Footer = () => {
  return (
    <Container>
      API source : <a href="https://www.themoviedb.org/">TMDB</a>
    </Container>
  );
};

export default Footer;