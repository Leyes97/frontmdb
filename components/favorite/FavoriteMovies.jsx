'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import MovieList from './MovieList';
import EmptyStateMessage from './EmptyStateMessage';
import Spinner from '../modals/Spinner';

const FavoriteMovies = ({ user }) => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true); // Estado de carga

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
          console.error('Error fetching favorite movies:', error);
        } finally {
          setLoading(false); // Cambiar estado de carga
        }
      }
    };
    fetchFavoriteMovies();
  }, [user, favoriteMovies.length]);

  useEffect(() => {
    const fetchMovies = async () => {
      if (favoriteMovies.length > 0) {
        setLoading(true); // Cambiar estado de carga al iniciar la petición
        try {
          const movieRequests = favoriteMovies.map((movieId) =>
            axios.get(`http://localhost:8080/api/movies/${movieId}`),
          );
          const movieResponses = await Promise.all(movieRequests);
          const moviesData = movieResponses.map((response) => response.data);
          setMovies(moviesData);
        } catch (error) {
          console.error('Error fetching movies:', error);
        } finally {
          setLoading(false); // Cambiar estado de carga al finalizar la petición
        }
      } else {
        setMovies([]);
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
        setFavoriteMovies((prev) => prev.filter((id) => id !== movieId));
        setMovies((prev) => prev.filter((movie) => movie.id !== movieId));
      } catch (error) {
        console.error('Error removing movie:', error);
      }
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      {movies.length > 0 ? (
        <>
          <motion.h1
            className="text-4xl text-white uppercase mb-8"
            initial={{ opacity: 0, y: -150 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 4 }}>
            Your Favorite Movies
          </motion.h1>
          <MovieList movies={movies} handleDelete={handleDelete} />
        </>
      ) : (
        <EmptyStateMessage />
      )}
    </div>
  );
};

export default FavoriteMovies;
