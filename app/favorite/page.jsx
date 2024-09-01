'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { FaPlay } from 'react-icons/fa';
import { baseUrl } from '@/constants/movie';
import { motion } from 'framer-motion';

const FavoritePage = () => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [movies, setMovies] = useState([]);
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;

  useEffect(() => {
    const fetchFavoriteMovies = async () => {
      if (user && user.id && favoriteMovies.length === 0) {
        try {
          const response = await axios.get(
            `http://localhost:8080/api/users/get/${user.id}`,
          );
          if (response.status === 200) {
            setFavoriteMovies(response.data);
          }
        } catch (error) {
          console.error('Error al obtener las películas favoritas:', error);
        }
      }
    };

    fetchFavoriteMovies();
  }, [user, favoriteMovies.length]);

  useEffect(() => {
    const fetchMovies = async () => {
      if (favoriteMovies.length > 0) {
        try {
          const movieRequests = favoriteMovies.map((movieId) =>
            axios.get(`http://localhost:8080/api/movies/${movieId}`),
          );

          const movieResponses = await Promise.all(movieRequests);
          const moviesData = movieResponses.map((response) => response.data);

          setMovies(moviesData);
        } catch (error) {
          console.error('Error al obtener las películas:', error);
        }
      }
    };

    fetchMovies();
  }, [favoriteMovies]);

  const handleDelete = async (movieId) => {
    if (user && user.id) {
      try {
        await axios.delete(
          `http://localhost:8080/api/users/remove/${user.id}/${movieId}`,
        );
        const updatedFavoriteMovies = favoriteMovies.filter(
          (id) => id !== movieId,
        );
        setFavoriteMovies(updatedFavoriteMovies);
        setMovies(movies.filter((movie) => movie.id !== movieId));
      } catch (error) {
        console.error('Error al eliminar la película:', error);
      }
    }
  };

  const message = "You haven't added any movies to your favorites yet...";
  const letters = message.split('');

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-primary p-4">
      {movies.length > 0 && (
        <motion.h1
          className="text-4xl text-white uppercase mb-8"
          initial={{ opacity: 0, y: -150 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 4 }}>
          Your Favorite Movies
        </motion.h1>
      )}

      {movies.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-screen-lg">
          {movies.map((movie, index) => (
            <div
              key={index}
              className="flex flex-col rounded-lg shadow-xl overflow-hidden bg-primary/25 h-full">
              <div className="relative w-full h-64">
                <Image
                  src={`${baseUrl}${movie.poster_path}`}
                  fill
                  alt="Movie Poster"
                  className="object-cover"
                  loading="lazy"
                />
              </div>

              <div className="flex-auto p-4 flex flex-col justify-between">
                <div>
                  <h1 className="text-lg md:text-xl font-semibold text-white/80">
                    {movie.title}
                  </h1>
                  <div className="mt-4 mb-6 pb-4 border-b border-slate-200 max-h-32 overflow-y-auto scrollbar-thin scrollbar-thumb-accent scrollbar-track-transparent">
                    <div className="text-sm text-white/60">
                      {movie.overview}
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center space-x-4 text-sm font-medium">
                  <p className="text-lg text-white/80">
                    {movie.spoken_languages[0]?.english_name}
                  </p>
                  <div className="flex space-x-2">
                    <button
                      className="h-10 w-10 flex items-center justify-center rounded-full bg-accent text-primary hover:bg-accent/80 transition-colors duration-200"
                      type="button">
                      <FaPlay className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(movie.id)}
                      className="h-10 px-4 md:px-6 font-semibold rounded-md border border-black-800 text-white/80 hover:bg-accent/80 hover:text-primary transition-colors duration-200"
                      type="button">
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center h-full w-full text-center overflow-hidden">
          <div className="text-center w-full px-4">
            {letters.map((letter, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 4,
                  delay: index * 0.1,
                  repeat: Infinity,
                  repeatType: 'reverse',
                }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl text-white break-all"
                style={{ display: 'inline-block' }}>
                {letter === ' ' ? '\u00A0' : letter}
              </motion.span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FavoritePage;
