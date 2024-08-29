'use client';
import { useState, useEffect } from 'react';
import YouTube from 'react-youtube';
import axios from 'axios';
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from 'react-icons/md';

const Modal = ({ isOpen, setIsOpen, movieData, children }) => {
  const [isFavorite, setIsFavorite] = useState(false); // Estado para el ícono de favorito
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;

  const handleClose = (e) => {
    e.preventDefault();
    setIsOpen(false);
  };

  const handleFavoriteClick = async () => {
    try {
      if (user.id) {
        const movieId = movieData.id;

        // Si ya es favorito, lo quitamos. De lo contrario, lo agregamos.
        if (isFavorite) {
          await axios.delete(
            `http://localhost:8080/api/users/remove/${user.id}/${movieId}`,
          );
          setIsFavorite(false);
        } else {
          await axios.post(
            `http://localhost:8080/api/users/add/${user.id}/${movieId}`,
          );
          setIsFavorite(true);
        }
      } else {
        alert('Por favor, inicia sesión para agregar a favoritos');
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const checkIfFavorite = async () => {
      if (user?.id && movieData?.id) {
        const response = await axios.get(
          `http://localhost:8080/api/users/get/${user.id}`,
        );
        const favorites = response.data;
        setIsFavorite(favorites?.includes(movieData.id));
      }
    };

    if (isOpen) {
      checkIfFavorite();
    }
  }, [isOpen, user, movieData]);

  if (!isOpen) return null;

  const videoOptions = {
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Background overlay */}
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={handleClose}></div>

      {/* Modal content */}
      <div className="relative bg-white/5 p-6 rounded-lg shadow-lg w-[90%] max-w-3xl mx-auto">
        {children}
        <div className="w-full h-0 pb-[56.25%] relative mt-4 mb-4">
          {/* 16:9 Aspect Ratio */}
          <YouTube
            videoId={movieData.movieKey[0]?.key}
            opts={{
              ...videoOptions,
              width: '100%',
              height: '100%',
            }}
            className="absolute inset-0 w-full h-full"
          />
        </div>
        {/* Container for favorite button */}
        <div className="flex justify-end mt-4">
          {isFavorite ? (
            <MdOutlineFavorite
              className="text-4xl text-pink-700"
              onClick={handleFavoriteClick}
            />
          ) : (
            <MdOutlineFavoriteBorder
              className="text-4xl text-white"
              onClick={handleFavoriteClick}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
