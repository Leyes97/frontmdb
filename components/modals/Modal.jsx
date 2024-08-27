'use client';
import YouTube from 'react-youtube'; // Importar el componente de react-youtube

const Modal = ({ isOpen, setIsOpen, movieData, children }) => {
  const handleClose = (e) => {
    e.preventDefault();
    setIsOpen(false);
  };

  if (!isOpen) return null;
 
  const videoOptions = {
    height: '640',
    width: '860',
    playerVars: {
      autoplay: 1, 
    },
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center container">
      {/*Background overlay */}
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={handleClose}></div>

      {/* Modal content */}
      <div className=" p-4 rounded-lg shadow-lg  ">
        {children}
        <YouTube videoId={movieData[0]?.key} opts={videoOptions} />
      </div>
    </div>
  );
};

export default Modal;
