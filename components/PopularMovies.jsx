'use client';
import React, { useRef, useEffect, useReducer, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPopular, setPage } from '@/app/store/popularSlice';
import axios from 'axios';

import SliderMovie from './SliderMovie';

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

const PopularMovies = () => {
  const popular = useSelector((state) => state.popular.data);
  const currentPage = useSelector((state) => state.popular.page);
  const [state, localDispatch] = useReducer(reducer, initialState);
  const swiperRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPopular(currentPage));
  }, [dispatch, currentPage]);

  const handleReachEnd = useCallback(() => {
    dispatch(setPage(currentPage + 1));
    dispatch(fetchPopular(currentPage + 1));
  }, [dispatch, currentPage]);

  const handleMovieById = useCallback(async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/movies/${id}`,
      );
      const movieKey = response.data.videos.filter(
        (trailer) => trailer.type === 'Trailer',
      );
      localDispatch({ type: 'SET_MOVIE_DATA', payload: movieKey });
    } catch (error) {
      console.error('Error fetching movie by ID:', error);
    }
  }, []);

  const closeModal = useCallback(() => {
    localDispatch({ type: 'CLOSE_MODAL' });
  }, []);

  return (
    <>
      <SliderMovie
        title={'Popular'}
        handleReachEnd={handleReachEnd}
        reduxState={popular}
        handleMovieById={handleMovieById}
        swiperRef={swiperRef}
        state={state}
        closeModal={closeModal}
      />
    </>
  );
};

export default PopularMovies;
