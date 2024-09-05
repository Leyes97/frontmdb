'use client';

import { motion } from 'framer-motion';

// Components
import PopularMovies from '@/components/PopularMovies';
import CinemaMovies from '@/components/CinemaMovies';
import UpcomingMovies from '@/components/UpcomingMovies';
import TopMovies from '@/components/TopMovies';
import { useSelector } from 'react-redux';
import SearchMovies from '@/components/SearchMovies';

const Home = () => {
  const { movies } = useSelector((state) => state.search);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 2.4, duration: 0.4, ease: 'easeIn' },
      }}
      className="min-h-[30vh] flex flex-col justify-center items-center py-2 xl:px-0 w-full">
      {movies.results?.length > 0 ? (
        <SearchMovies movies={movies?.results} />
      ) : (
        <>
          <PopularMovies />
          <UpcomingMovies />
          <TopMovies />
          <CinemaMovies />
        </>
      )}
    </motion.section>
  );
};

export default Home;
