'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { baseUrl } from '@/constants/movie';

// Components
import PopularMovies from '@/components/PopularMovies';
import CinemaMovies from '@/components/CinemaMovies';
import UpcomingMovies from '@/components/UpcomingMovies';
import TopMovies from '@/components/TopMovies';

const Home = () => {
  const [randomImage, setRandomImage] = useState(null);
 
  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8080/api/movies/popular',
        );
        const movies = response.data;

        if (movies?.results && movies.results.length > 0) {
          const randomMovie =
            movies.results[Math.floor(Math.random() * movies.results.length)];
          setRandomImage(randomMovie.backdrop_path);
        }
      } catch (error) {
        console.error('Error al obtener películas populares:', error);
      }
    };

    fetchPopularMovies();
  }, []);

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundImage: randomImage ? `url(${baseUrl}${randomImage})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
      {}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: { delay: 2.4, duration: 0.4, ease: 'easeIn' },
        }}
        className="min-h-[30vh] flex flex-col justify-center items-center py-12 xl:px-0 w-full">
        <PopularMovies />
        <UpcomingMovies />
        <TopMovies />
        <CinemaMovies />
      </motion.section>
      
    </div>
  );
};

export default Home;
