'use client';
import { useRef, useEffect, useReducer, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUpcoming, setPage } from '@/app/store/upcomingSlice';
import axios from 'axios';
import SliderMovie from './SliderMovie';

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

const UpcomingMovies = () => {
  const upcoming = useSelector((state) => state.upcoming.data);
  const currentPage = useSelector((state) => state.upcoming.page);
  const [state, localDispatch] = useReducer(reducer, initialState);
  const swiperRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUpcoming(currentPage));
  }, [dispatch, currentPage]);

  const handleReachEnd = useCallback(() => {
    dispatch(setPage(currentPage + 1));
    dispatch(fetchUpcoming(currentPage + 1));
  }, [dispatch, currentPage]);

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

  return (
    <>
      <SliderMovie
        title={'Upcoming'}
        handleReachEnd={handleReachEnd}
        reduxState={upcoming}
        handleMovieById={handleMovieById}
        swiperRef={swiperRef}
        state={state}
        closeModal={closeModal}
      />
    </>
  );
};

export default UpcomingMovies;
