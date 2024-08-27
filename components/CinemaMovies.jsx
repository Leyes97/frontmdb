'use client';
import { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCinema, setPage } from '@/app/store/cinemaSlice';
import { PiCaretLeftBold, PiCaretRightBold } from 'react-icons/pi';
import { baseUrl } from '@/constants/movie';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Image from 'next/image';

const CinemaMovies = () => {
  const cinema = useSelector((state) => state.cinema.data);
  const currentPage = useSelector((state) => state.cinema.page);
  const swiperRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCinema(Number(currentPage)));
  }, [dispatch, currentPage]);

  const handleReachEnd = () => {
    const nextPage = Number(currentPage) + 1;
    dispatch(setPage(nextPage));
    dispatch(fetchCinema(nextPage));
  };

  return (
    <div className="relative w-full max-w-[95%] mb-3">
      <h1 className="font-bold uppercase text-2xl">Now Playing</h1>
      <div className="relative flex flex-col xl:flex-row xl:gap-[20px] w-full">
        <div className="w-full relative h-[30vh]">
          <Swiper
            ref={swiperRef}
            spaceBetween={20}
            slidesPerView={12}
            className="h-full w-full"
            onReachEnd={handleReachEnd}
            breakpoints={{
              0: { slidesPerView: 2 },
              640: { slidesPerView: 3 },
              768: { slidesPerView: 4 },
              1024: { slidesPerView: 6 },
              1200: { slidesPerView: 8 },
            }}>
            {cinema.map((project, index) => (
              <SwiperSlide key={index} className="w-full">
                <div className="relative w-full h-full overflow-hidden hover:scale-110 rounded-2xl">
                  <Image
                    src={`${baseUrl}${project.poster_path}`}
                    width={150}
                    height={150}
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
  );
};

export default CinemaMovies;
