// src/pages/HomePage.js
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import MovieForm from "../specific/MovieForm";
import Card from "../specific/Card";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";
import { IoCloseCircleSharp } from "react-icons/io5";

const HomePage = () => {
  const [showForm, setShowForm] = useState(false);
  const movies = useSelector((state) => state.movies.movies);
  const location = useLocation();
  const [filter, setFilter] = useState("all");

  const handleAddMovieClick = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const filterParam = queryParams.get("filter");
    if (filterParam) {
      setFilter(filterParam);
    }
  }, [location]);

  const filteredMovies = movies.filter((movie) => {
    if (filter === "watched") {
      return movie.watched;
    } else if (filter === "unwatched") {
      return !movie.watched;
    }
    return true;
  });
  return (
    <div className="container mx-auto p-4">
      <ToastContainer />

      <div className="flex w-full justify-center items-center flex-col gap-3">
        <h1 className="text-3xl font-bold mb-4">Add Your Movies...</h1>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={handleAddMovieClick}
        >
          Add Movie
        </button>
      </div>
      <h2 className="text-3xl font-bold mb-4 mt-4">Movie List</h2>
      {showForm && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-[2]">
          <div className="bg-white p-4 rounded shadow-lg relative w-full max-w-md h-[95vh]">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={handleCloseForm}
            >
              <IoCloseCircleSharp fontSize={25} />
            </button>
            <MovieForm closeForm={handleCloseForm} />
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {!filteredMovies || filteredMovies.length <= 0
          ? "Add Movies"
          : filteredMovies.map((movie) => (
              <Card key={movie.id} movie={movie} />
            ))}
      </div>
    </div>
  );
};

export default HomePage;
