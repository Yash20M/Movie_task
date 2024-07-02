// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/pages/HomePage";
import MovieDetails from "./components/pages/MovieDetials";
import EditMovie from "./components/pages/EditMovies";
import Navbar from "./components/specific/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details/:movieId" element={<MovieDetails />} />
        <Route path="/edit/:movieId" element={<EditMovie />} />
      </Routes>
    </Router>
  );
}

export default App;
