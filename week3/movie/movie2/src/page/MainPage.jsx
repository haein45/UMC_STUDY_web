import React, { useEffect, useState } from "react";
import styled from "styled-components";
import IconSearch from "../assets/IconSearch";
import { Movie } from "../component/Movie";

const Container = styled.div`
  text-align: center;
  font-weight: bold;
  color: white;
`;

const WelcomeBox = styled.div`
  padding: 150px 0;
  background-color: black;
  font-size: 24px;
`;

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 0 250px 0;
  font-size: 34px;
  background-color: #21224a;
`;

const SearchBox = styled.div`
  display: flex;
  justify-content: center;
  width: 80%;
  padding-left: 20px;
  margin-top: 35px;

  svg {
    height: 30px;
    margin: 3px 0 0 0;
  }
`;

const SearchInput = styled.input`
  width: 50%;
  padding: 7px 15px;
  border-radius: 16px;
  margin-right: 15px;
`;

const SearchResult = styled.div`
  width: 70%;
  height: 500px;
  margin: 50px 0 0 0;
  padding: 30px 60px;
  background-color: #171b39;
  overflow: scroll;
  scrollbar-width: thin;
  scrollbar-color: #fecb24 #fecb24;
`;

const Loading = styled.div`
  width: 100%;
  font-size: 18px;
`;

const MovieContainer = styled.div`
  display: grid;
  grid-template-columns: 25% 25% 25% 25%;
  grid-gap: 10px;

  div {
    font-size: 14px;
  }
`;

const MainPage = () => {
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchData, setSearchData] = useState([]);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MWFjZTJhNmUwMjY3NjI3ZTU3OWRkYWRmNTA5YzNkMyIsInN1YiI6IjY2MWQwNWRlNjBjNTFkMDE4NjRlYzQ5YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rpY_VCCrowKMdMCuPi-k9hM6tiMx8LSRLf9MYv6m5-s",
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      if (search === "") {
        setSearchData([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const url = `https://api.themoviedb.org/3/search/movie?query=${search}`;
        const response = await fetch(url, options);
        const data = await response.json();
        setSearchData(data.results || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const delayDebounceTimer = setTimeout(() => {
      fetchData();
    }, 1000);

    return () => clearTimeout(delayDebounceTimer);
  }, [search]);

  const handleInputChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <Container>
      <WelcomeBox>
        <h2>환영합니다</h2>
      </WelcomeBox>
      <SearchContainer>
        <h1>🎥 Find your movies!</h1>
        <SearchBox>
          <SearchInput onChange={handleInputChange} />
          <IconSearch />
        </SearchBox>
        {isLoading ? (
          <Loading>데이터를 받아오는 중입니다...</Loading>
        ) : searchData.length > 0 ? (
          <SearchResult>
            <MovieContainer>
              {searchData.map((item) => (
                <Movie key={item.id} item={item} />
              ))}
            </MovieContainer>
          </SearchResult>
        ) : (
          <></>
        )}
      </SearchContainer>
    </Container>
  );
};

export default MainPage;
