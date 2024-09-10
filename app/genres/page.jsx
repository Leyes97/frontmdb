'use client';
import { useEffect, useState, useReducer, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

//components
import SliderMovie from '@/components/SliderMovie';

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
const GenresMovies = () => {
  const [genres, setGenres] = useState([]);
  const currentPage = useSelector((state) => state.upcoming.page);
  const [state, localDispatch] = useReducer(reducer, initialState);
  const swiperRef = useRef(null);
  const dispatch = useDispatch();

  const handleGenres = async () => {
    const response = await axios.get('http://localhost:8080/api/movies/genres');
    setGenres(response.data.genres);
  };

  const closeModal = useCallback(() => {
    localDispatch({ type: 'CLOSE_MODAL' });
  }, []);

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

  const handleReachEnd = useCallback(() => {
    
  }, []);

  useEffect(() => {
    handleGenres();
  }, []);

  console.log(genres);
  return (
    <div>
      {genres?.map((genre, index) => {
        return (
          <div key={index}>
            <SliderMovie
              title={genre.name}
              handleReachEnd={handleReachEnd}
              reduxState={[]}
              handleMovieById={handleMovieById}
              swiperRef={swiperRef}
              state={state}
              closeModal={closeModal}
            />
          </div>
        );
      })}
    </div>
  );
};

export default GenresMovies;
