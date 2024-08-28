'use client';
import YouTube from 'react-youtube';

const Modal = ({ isOpen, setIsOpen, movieData, children }) => {
  const handleClose = (e) => {
    e.preventDefault();
    setIsOpen(false);
  };
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
      <div className="relative p-4 rounded-lg shadow-lg w-[90%] max-w-3xl mx-auto">
        {children}
        <div className="w-full h-0 pb-[56.25%] relative">
          {' '}
          {/* 16:9 Aspect Ratio */}
          <YouTube
            videoId={movieData[0]?.key}
            opts={{
              ...videoOptions,
              width: '100%',
              height: '100%',
            }}
            className="absolute inset-0 w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Modal;
