import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Movie } from "../component/Movie";


const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 30px;
  padding: 40px;
  background-color: #21234b;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 30px 100px;
  }
`;

const TopRatedPage = () => {
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MWFjZTJhNmUwMjY3NjI3ZTU3OWRkYWRmNTA5YzNkMyIsInN1YiI6IjY2MWQwNWRlNjBjNTFkMDE4NjRlYzQ5YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rpY_VCCrowKMdMCuPi-k9hM6tiMx8LSRLf9MYv6m5-s",
    },
  };
  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      const data = await fetch(
        "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
        options
      )
        .then((res) => res.json())
        .catch((err) => console.log(err));

      setMovieList(data.results.slice(0, 8));
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <>
        <Container>
          {movieList.map((item) => (
            <Movie key={item.id} item={item} />
          ))}
        </Container>
    </>
  );
};

export default TopRatedPage;
