import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import MainPage from "./page/MainPage";
import LoginPage from "./page/LoginPage";
import SignupPage from "./page/SignupPage";
import NavBar from "./component/NavBar";
import Footer from "./component/Footer";
import PopularPage from "./page/PopularPage";
import NowPlayingPage from "./page/NowPlayingPage";
import TopRatedPage from "./page/TopRatedPage";
import UpComingPage from "./page/UpComingPage";
import MovieDetailPage from "./page/MovieDetailPage";
import NotFoundPage from "./page/NotFoundPage";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<MainPage />}></Route>
        <Route exact path="/login" element={<LoginPage />}></Route>
        <Route exact path="/signup" element={<SignupPage />}></Route>
        <Route exact path="/popular" element={<PopularPage />}></Route>
        <Route exact path="/nowplaying" element={<NowPlayingPage />}></Route>
        <Route exact path="/toprated" element={<TopRatedPage />}></Route>
        <Route exact path="/upcoming" element={<UpComingPage />}></Route>
        <Route exact path="/movie/:id" element={<MovieDetailPage />}></Route>
        <Route exact path="*" element={<NotFoundPage />}></Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;