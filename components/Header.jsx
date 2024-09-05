'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import axios from 'axios';

//components
import Nav from './Nav';
import MobileNav from './MobileNav';
import SearchBar from './SearchBar';
import CustomButton from './CustomButton';

const Header = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const logout = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8080/api/users/logout',
        {},
        { withCredentials: true },
      );
      if (response.status === 204) {
        localStorage.removeItem('user');
        setUser(null);

        window.location.href = '/login';
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <>
      {user && (
        <header className="py-8 xl:py-3 text-white">
          <div className=" flex justify-between items-center mx-12">
            {/* Logo */}
            <Link href="/">
              <motion.h1
                initial={{ opacity: 0, y: -60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 4 }}
                className="text-4xl font-semibold text-accent">
                TMDB
              </motion.h1>
            </Link>

            {/* Search bar */}
            <div className="xl:hidden">
              <SearchBar />
            </div>

            {/* Desktop nav and button login/logout and avatar */}
            <motion.div
              initial={{ opacity: 0, y: -60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 4 }}
              className="hidden xl:flex items-center gap-12">
              <Nav />
              <CustomButton text={'logout'} onClick={logout} />
            </motion.div>

            {/* Mobile nav */}
            <div className="xl:hidden flex items-center gap-6">
              <MobileNav />
            </div>
          </div>
        </header>
      )}
    </>
  );
};

export default Header;
