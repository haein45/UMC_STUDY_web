import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

const Title = styled.h1`
  margin: 20px 0;
  font-size: 24px;
  font-weight: bold;
  color: white;
`;

const Content = styled.div`
  margin: 20px 0;
  font-size: 16px;
  font-weight: bold;
  color: white;
`;

const MovieDetailPage = () => {
  const state = useLocation().state;
  const {
    original_title,
    backdrop_path,
    poster_path,
    rate,
    release_date,
    overview,
  } = state;
  const star = rate && "⭐️".repeat(Math.floor(rate));
  const summary = overview
    ? overview
    : "TMDB에서 제공하는 API에 상세 줄거리 정보가 없습니다.";

  const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 30px;
    padding: 85px 150px;
    background-image: url(${"http://image.tmdb.org/t/p/w500/" + backdrop_path});
    background-repeat: no-repeat;
    background-size: cover;
    background-color: rgba(32, 35, 75, 0.9);
    background-blend-mode: multiply;

    div:first-child {
      display: flex;
      align-items: center;

      img {
        width: 90%;
      }
    }

    div:last-child {
      display: flex;
      flex-direction: column;
      justify-content: center;

      div:last-child {
        font-weight: normal;
      }
    }

    @media (max-width: 768px) {
      padding: 70px 70px;
      grid-template-columns: 1fr;

      div:first-child {
        display: block;

        img {
          width: 70%;
        }
      }
    }
  `;

  return (
    <Container>
      <div>
        <img src={"http://image.tmdb.org/t/p/w500/" + poster_path} alt={original_title} />
      </div>
      <div>
        <Title>{original_title}</Title>
        <Content>평점 {star}</Content>
        <Content>개봉일 {release_date}</Content>
        <Content>줄거리</Content>
        <Content>{summary}</Content>
      </div>
    </Container>
  );
};

export default MovieDetailPage;
