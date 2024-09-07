'use client';
import axios from 'axios';
import Image from 'next/image';
import { baseUrl } from '@/constants/movie';
import { useCallback, useReducer, useState } from 'react';
import Modal from './modals/Modal';

const initialState = {
  movieData: null,
  isOpen: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_MOVIE_DATA':
      return { ...state, movieData: action.payload, isOpen: true };
    case 'CLOSE_MODAL':
      return { ...state, isOpen: false };
    default:
      return state;
  }
};

const SearchMovies = ({ movies }) => {
  const [state, localDispatch] = useReducer(reducer, initialState);

  const handleMovieById = useCallback(async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/movies/${id}`,
      );
      const movieKey = response.data.videos.filter(
        (trailer) => trailer.type === 'Trailer',
      );
      const objMovie = {
        id: response.data.id,
        movieKey: movieKey,
      };
      localDispatch({ type: 'SET_MOVIE_DATA', payload: objMovie });
    } catch (error) {
      console.error('Error fetching movie by ID', error);
    }
  }, []);

  const closeModal = useCallback(() => {
    localDispatch({ type: 'CLOSE_MODAL' });
  }, []);

  console.log('Películas seleccionadas--->', state);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-screen-lg">
      {movies?.map((movie, index) => (
        <div
          key={index}
          className="flex flex-col rounded-lg shadow-xl overflow-hidden bg-primary/25 h-full cursor-pointer"
          onClick={() => handleMovieById(movie.id)}>
          <div className="relative w-full h-64">
            <Image
              src={`${baseUrl}${movie.poster_path}`}
              fill
              alt="Movie Poster"
              className="object-cover"
              loading="lazy"
            />
          </div>
          <div className="mt-4 mb-6 pb-4 border-b border-slate-200 max-h-32 overflow-y-auto scrollbar-thin scrollbar-thumb-accent scrollbar-track-transparent"></div>
          <div className="flex justify-between items-center p-4">
            <h1 className="text-lg md:text-xl font-semibold text-white/80">
              {movie.title}
            </h1>
          </div>
        </div>
      ))}
      {state.isOpen && (
        <Modal
          isOpen={state.isOpen}
          setIsOpen={closeModal}
          movieData={state.movieData}
        />
      )}
    </div>
  );
};

export default SearchMovies;
