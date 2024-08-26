'use client';

import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { baseUrl } from '@/constants/movie';

//components
import PopularMovies from '@/components/PopularMovies';
import CinemaMovies from '@/components/CinemaMovies';
import UpcomingMovies from '@/components/UpcomingMovies';
import TopMovies from '@/components/TopMovies';

const Home = () => {
  const bgPopular = useSelector((state) => state.popular.data);

  const randomImage = bgPopular?.results
    ? bgPopular.results[Math.floor(Math.random() * bgPopular.results.length)]
        .backdrop_path
    : null;

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundImage: randomImage
          ? `url(${baseUrl}${randomImage})`
          : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <motion.section
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: { delay: 2.4, duration: 0.4, ease: 'easeIn' },
        }}
        className="min-h-[30vh] flex flex-col justify-center py-12 xl:px-0 w-full"
      >
        <PopularMovies />
        <UpcomingMovies />
        <TopMovies />
        <CinemaMovies />
      </motion.section>
    </div>
  );
};

export default Home;
