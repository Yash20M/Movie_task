// src/components/Card.js
import React from "react";
import { FaEdit, FaEye, FaEyeSlash, FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactTooltip from "react-tooltip";
import { deleteMovie, toggleWatched } from "../../store/slice/movieSlice";

const Card = ({ movie }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleToggleWatched = (e) => {
    e.stopPropagation();
    dispatch(toggleWatched(movie.id));
    const message = movie.watched ? "Marked as Unwatched" : "Marked as Watched";
    toast.success(message);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    dispatch(deleteMovie(movie.id));
    toast.error("Movie deleted successfully");
  };

  const handleCardClick = () => {
    navigate(`/details/${movie.id}`);
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    navigate(`/edit/${movie.id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-white p-4 rounded shadow-lg relative flex items-center justify-between hover:bg-gray-100 cursor-pointer"
    >
      <div>
        <h2 className="text-xl font-bold">{movie.title}</h2>
        <p className="text-gray-500">Genre: {movie.genre}</p>
        <div className="flex items-center">
          {[...Array(5)].map((_, index) => (
            <svg
              key={index}
              className={`w-6 h-6 ${
                index < movie.starReviews ? "text-yellow-500" : "text-gray-300"
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

      <div className="flex items-center gap-4">
        <button
          data-tip={movie.watched ? "Unwatch" : "Watch"}
          className="text-green-500 hover:text-green-700"
          onClick={handleToggleWatched}
        >
          {movie.watched ? <FaEyeSlash /> : <FaEye />}
        </button>

        <button
          data-tip="Edit"
          className="text-blue-500 hover:text-blue-700"
          onClick={handleEdit}
        >
          <FaEdit />
        </button>

        <button
          data-tip="Delete"
          onClick={handleDelete}
          className="text-red-500 hover:text-red-700 cursor-pointer"
        >
          <FaTrash />
        </button>
        <ReactTooltip />
      </div>
    </div>
  );
};

export default Card;
