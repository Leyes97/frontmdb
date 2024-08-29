'use client';
import { useRef, useEffect, useReducer, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCinema, setPage } from '@/app/store/cinemaSlice';
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

const CinemaMovies = () => {
  const cinema = useSelector((state) => state.cinema.data);
  const currentPage = useSelector((state) => state.cinema.page);
  const [state, localDispatch] = useReducer(reducer, initialState);
  const swiperRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCinema(Number(currentPage)));
  }, [dispatch, currentPage]);

  const handleReachEnd = useCallback(() => {
    const nextPage = Number(currentPage) + 1;
    dispatch(setPage(nextPage));
    dispatch(fetchCinema(nextPage));
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
        title={'Now Playing'}
        handleReachEnd={handleReachEnd}
        reduxState={cinema}
        handleMovieById={handleMovieById}
        swiperRef={swiperRef}
        state={state}
        closeModal={closeModal}
      />
    </>
  );
};

export default CinemaMovies;
