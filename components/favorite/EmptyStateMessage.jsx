'use client';

import { motion } from 'framer-motion';

const EmptyStateMessage = () => {
  const message = "You haven't added any movies to your favorites yet...";
  const letters = message.split('');

  return (
    <div className="flex flex-col justify-center items-center h-full w-full text-center">
      <div className="text-center w-full px-4">
        {letters.map((letter, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 4, delay: index * 0.1, repeat: Infinity }}
            className="text-3xl sm:text-4xl md:text-5xl text-white">
            {letter === ' ' ? '\u00A0' : letter}
          </motion.span>
        ))}
      </div>
    </div>
  );
};

export default EmptyStateMessage;
