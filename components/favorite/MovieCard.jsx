'use client';

import Image from 'next/image';
import { FaPlay } from 'react-icons/fa';
import { baseUrl } from '@/constants/movie';

const MovieCard = ({ movie, handleDelete }) => {
  return (
    <div className="flex flex-col rounded-lg shadow-xl overflow-hidden bg-primary/25 h-full">
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
          <div className="mt-4 mb-6 pb-4 border-b border-slate-200 max-h-32 overflow-y-auto">
            <div className="text-sm text-white/60">{movie.overview}</div>
          </div>
        </div>
        <div className="flex justify-between items-center space-x-4 text-sm font-medium">
          <p className="text-lg text-white/80">
            {movie.spoken_languages[0]?.english_name}
          </p>
          <div className="flex space-x-2">
            <button className="h-10 w-10 flex items-center justify-center rounded-full bg-accent text-primary">
              <FaPlay className="h-4 w-4" />
            </button>
            <button
              onClick={() => handleDelete(movie.id)}
              className="h-10 px-4 font-semibold rounded-md border text-white/80 hover:bg-accent/80 transition-colors duration-200">
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
