// src/components/Navbar.js
import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleFilterClick = (filter) => {
    navigate(`/?filter=${filter}`);
  };

  return (
    <nav className="sticky top-0 bg-gray-800 text-white py-2 px-4 md:py-4 md:px-8 flex flex-row justify-between items-center shadow-md">
      <div
        className="text-lg md:text-xl font-bold cursor-pointer"
        onClick={() => navigate("/")}
      >
        Movio
      </div>
      <div className="flex flex-row space-x-2 md:space-x-4">
        <button
          className="px-2 py-1 md:px-4 md:py-2 rounded bg-gray-700 hover:bg-gray-900 text-sm md:text-base"
          onClick={() => handleFilterClick("all")}
        >
          All
        </button>
        <button
          className="px-2 py-1 md:px-4 md:py-2 rounded bg-gray-700 hover:bg-gray-900 text-sm md:text-base"
          onClick={() => handleFilterClick("watched")}
        >
          Watched
        </button>
        <button
          className="px-2 py-1 md:px-4 md:py-2 rounded bg-gray-700 hover:bg-gray-900 text-sm md:text-base"
          onClick={() => handleFilterClick("unwatched")}
        >
          Unwatched
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
