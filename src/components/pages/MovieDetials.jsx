// src/components/MovieDetails.js
import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const MovieDetails = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const movie = useSelector((state) =>
    state.movies.movies.find((movie) => movie.id === movieId)
  );

  if (!movie) {
    return <div>Movie not found.</div>;
  }

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={handleBackClick}
        className="text-white bg-gray-800 hover:bg-gray-900 px-4 py-2 rounded mb-4 flex items-center"
      >
        <FaArrowLeft className="mr-2" /> Back
      </button>

      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-3xl font-bold mb-4">{movie.title}</h2>
        <div className="flex justify-between mb-4">
          <div className="text-gray-500">Genre: {movie.genre}</div>
          <div className="flex items-center">
            {[...Array(5)].map((_, index) => (
              <svg
                key={index}
                className={`w-6 h-6 ${
                  index < movie.starReviews
                    ? "text-yellow-500"
                    : "text-gray-300"
                }`}
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 .587l3.668 7.568 8.332 1.151-6.001 5.968 1.418 8.307L12 18.897l-7.418 4.684L5.999 15.274l-6-5.968 8.331-1.151L12 .587z" />
              </svg>
            ))}
          </div>
        </div>
        <p className="text-gray-700 mb-4">Description: {movie.description}</p>
        <p className="text-gray-500 mb-4">Release Year: {movie.releaseYear}</p>
        <p className="text-gray-700 mb-4">
          Review Detials: {movie.reviewDescription}
        </p>
      </div>
    </div>
  );
};

export default MovieDetails;
