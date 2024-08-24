'use client';

import { motion } from 'framer-motion';
import React, { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { PiCaretLeftBold, PiCaretRightBold } from 'react-icons/pi'; // Iconos de flechas
import axios from 'axios';
import Image from 'next/image';
import { baseUrl } from '@/constants/movie';

const Home = () => {
  const [popular, setPopular] = useState([]);
  const swiperRef = useRef(null); // Ref para Swiper

  useEffect(() => {
    (async () => {
      const data = await axios.get('http://localhost:8080/api/movies/popular');
      setPopular(data.data);
    })();
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 2.4, duration: 0.4, ease: 'easeIn' },
      }}
      className="min-h-[30vh] flex flex-col justify-center py-12 xl:px-0 w-full">
      <div className="container mx-auto relative w-full">
        <h1 className="font-bold uppercase">Popular</h1>
        <div className="relative flex flex-col xl:flex-row xl:gap-[20px] w-full">
          <div className="w-full relative h-[30vh]">
            <Swiper
              ref={swiperRef}
              spaceBetween={20}
              slidesPerView={12}
              className="h-full w-full"
              onSlideChange={(swiper) => {
                // Aquí puedes manejar cualquier lógica adicional que necesites cuando cambie el slide
                console.log('Slide cambiado al índice:', swiper.activeIndex);
              }}
              breakpoints={{
                0: { slidesPerView: 2 },
                640: { slidesPerView: 3 },
                768: { slidesPerView: 4 },
                1024: { slidesPerView: 6 },
                1200: { slidesPerView: 8 },
              }}>
              {popular?.results?.map((project, index) => (
                <SwiperSlide key={index} className="w-full">
                  <div className="relative w-full h-full overflow-hidden hover:scale-110 rounded-2xl">
                    <Image
                      src={`${baseUrl}${project.poster_path}`}
                      fill
                      className="object-cover w-full h-full cursor-pointer"
                      alt={project.title}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            {/* Botones de navegación */}
            <button
              className="swiper-button-prev absolute top-1/2 transform -translate-y-1/2 left-4 z-50 bg-transparent p-2 hover:bg-white/25 hover:scale-150 rounded-full"
              onClick={() => swiperRef.current.swiper.slidePrev()}>
              <PiCaretLeftBold className="text-white hover:text-primary/70 text-2xl" />
            </button>
            <button
              className="swiper-button-next absolute top-1/2 transform -translate-y-1/2 right-4 z-50 bg-transparent p-2 hover:bg-white/25 hover:scale-150 rounded-full"
              onClick={() => swiperRef.current.swiper.slideNext()}>
              <PiCaretRightBold className="text-white hover:text-primary/70 text-2xl" />
            </button>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Home;
