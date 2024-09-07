'use client';

import FavoriteMovies from '@/components/favorite/FavoriteMovies';

const FavoritePage = () => {
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-primary p-4">
      <FavoriteMovies user={user} />
    </div>
  );
};

export default FavoritePage;
