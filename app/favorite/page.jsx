'use client';

import FavoriteMovies from '@/components/favorite/FavoriteMovies';
import { useSelector } from 'react-redux';

//components
import SearchMovies from '@/components/SearchMovies';

const FavoritePage = () => {
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;
  const { movies } = useSelector((state) => state.search);
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-primary p-4">
      {movies.results?.length > 0 ? (
        <SearchMovies movies={movies?.results} />
      ) : (
        <FavoriteMovies user={user} />
      )}
    </div>
  );
};

export default FavoritePage;
