// src/components/EditMovie.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { editMovie } from "../../store/slice/movieSlice";
import { toast } from "react-toastify";
import { FaArrowLeft } from "react-icons/fa";

const EditMovie = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const movie = useSelector((state) =>
    state.movies.movies.find((movie) => movie.id === movieId)
  );

  const [formData, setFormData] = useState({
    title: movie?.title || "",
    description: movie?.description || "",
    releaseYear: movie?.releaseYear || "",
    genre: movie?.genre || "",
    starReviews: movie?.starReviews || 0,
    reviewDescription: movie?.reviewDescription || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleStarChange = (rating) => {
    setFormData((prevData) => ({
      ...prevData,
      starReviews: rating,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editMovie({ id: movieId, ...formData }));
    toast.success("Movie updated successfully!");
    navigate(`/`);
  };

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
        <h2 className="text-3xl font-bold mb-4">Edit Movie</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Release Year</label>
            <input
              type="text"
              name="releaseYear"
              value={formData.releaseYear}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Genre</label>
            <input
              type="text"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Star Reviews</label>
            <div className="flex">
              {[...Array(5)].map((_, index) => (
                <svg
                  key={index}
                  className={`w-6 h-6 cursor-pointer ${
                    index < formData.starReviews
                      ? "text-yellow-500"
                      : "text-gray-300"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={() => handleStarChange(index + 1)}
                >
                  <path d="M12 .587l3.668 7.568 8.332 1.151-6.001 5.968 1.418 8.307L12 18.897l-7.418 4.684L5.999 15.274l-6-5.968 8.331-1.151L12 .587z" />
                </svg>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Review Description</label>
            <textarea
              name="reviewDescription"
              value={formData.reviewDescription}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
              Update Movie
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMovie;
