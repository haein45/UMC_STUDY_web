import React, { useEffect, useState } from "react";
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

const PaginationControls = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;

  button {
    padding: 10px 20px;
    margin: 0 5px;
    border: none;
    background-color: #fecd28;
    cursor: pointer;
    font-size: 16px;
    color: white;

    &:disabled {
      background-color: #555;
      cursor: not-allowed;
    }
  }
`;

const CurrentPage = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
  color: white;
  font-size: 18px;
`;

const PopularPage = () => {
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const cache = {};

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MWFjZTJhNmUwMjY3NjI3ZTU3OWRkYWRmNTA5YzNkMyIsInN1YiI6IjY2MWQwNWRlNjBjNTFkMDE4NjRlYzQ5YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rpY_VCCrowKMdMCuPi-k9hM6tiMx8LSRLf9MYv6m5-s",
    },
  };

  const fetchData = async (page) => {
    setIsLoading(true);
    if (cache[page]) {
      setMovieList(cache[page]);
      setIsLoading(false);
    } else {
      const data = await fetch(
        `https://api.themoviedb.org/3/movie/popular?page=${page}`,
        options
      )
        .then((res) => res.json())
        .catch((err) => console.log(err));

      cache[page] = data.results;
      setMovieList(data.results);
      setTotalPages(data.total_pages);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  return (
    <>
      <Container>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          movieList.map((item) => <Movie key={item.id} item={item} />)
        )}
      </Container>
      <PaginationControls>
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </PaginationControls>
      <CurrentPage>Page {currentPage} of {totalPages}</CurrentPage>
    </>
  );
};

export default PopularPage;
