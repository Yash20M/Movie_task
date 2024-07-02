// src/features/movies/moviesSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movies: [],
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    addMovie: (state, action) => {
      state.movies.push({ ...action.payload, watched: false });
    },
    toggleWatched: (state, action) => {
      const movie = state.movies.find((movie) => movie.id === action.payload);
      if (movie) {
        movie.watched = !movie.watched;
      }
    },
    deleteMovie: (state, action) => {
      state.movies = state.movies.filter(
        (movie) => movie.id !== action.payload
      );
    },
    editMovie: (state, action) => {
      const index = state.movies.findIndex(
        (movie) => movie.id === action.payload.id
      );
      if (index !== -1) {
        state.movies[index] = { ...state.movies[index], ...action.payload };
      }
    },
  },
});

export const { addMovie, toggleWatched, deleteMovie, editMovie } =
  moviesSlice.actions;
export default moviesSlice.reducer;
