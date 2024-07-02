// src/components/MovieForm.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addMovie } from "../../store/slice/movieSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";

const MovieForm = ({ closeForm }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    releaseYear: "",
    genre: "",
    starReviews: 0,
    reviewDescription: "",
  });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleStarClick = (index) => {
    setFormData({
      ...formData,
      starReviews: index + 1,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const {
      title,
      description,
      releaseYear,
      genre,
      starReviews,
      reviewDescription,
    } = formData;
    if (
      !title ||
      !description ||
      !releaseYear ||
      !genre ||
      !reviewDescription
    ) {
      toast.error("Please fill in all fields.");
      return;
    }
    dispatch(addMovie({ ...formData, id: uuidv4() }));
    closeForm();
    toast.success("Movie added successfully!");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-gray-700">Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div>
        <label className="block text-gray-700">Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div>
        <label className="block text-gray-700">Release Year:</label>
        <input
          type="number"
          name="releaseYear"
          value={formData.releaseYear}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div>
        <label className="block text-gray-700">Genre:</label>
        <input
          type="text"
          name="genre"
          value={formData.genre}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div>
        <label className="block text-gray-700">Star Reviews:</label>
        <div className="flex space-x-1">
          {[...Array(5)].map((_, index) => (
            <svg
              key={index}
              onClick={() => handleStarClick(index)}
              className={`w-6 h-6 cursor-pointer ${
                index < formData.starReviews
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
      <div>
        <label className="block text-gray-700">Review Description:</label>
        <textarea
          name="reviewDescription"
          value={formData.reviewDescription}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add Movie
      </button>
    </form>
  );
};

export default MovieForm;
