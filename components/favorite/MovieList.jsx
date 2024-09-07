'use client';

import MovieCard from './MovieCard';

const MovieList = ({ movies, handleDelete }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-screen-lg">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} handleDelete={handleDelete} />
      ))}
    </div>
  );
};

export default MovieList;
