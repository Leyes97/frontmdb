'use client';
import React, { useReducer, useCallback, useRef } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import SliderMovie from './SliderMovie';
import Image from 'next/image';
import { baseUrl } from '@/constants/movie';
import { FaPlay } from 'react-icons/fa';

const initialState = {
  movieData: null,
  isOpen: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_MOVIE_DATA':
      return { ...state, movieData: action.payload, isOpen: true };
    case 'CLOSE_MODAL':
      return { ...state, isOpen: false };
    default:
      return state;
  }
}

const SearchMovies = ({ movies }) => {
  console.log('esto es dentro del componente--->', movies);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-screen-lg">
      {movies?.map((movie, index) => (
        <div
          key={index}
          className="flex flex-col rounded-lg shadow-xl overflow-hidden bg-primary/25 h-full cursor-pointer">
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
    </div>
  );
};

export default SearchMovies;
