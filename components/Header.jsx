'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';

//components
import Nav from './Nav';
import MobileNav from './MobileNav';
import SearchBar from './SearchBar';
import Avatar from './Avatar';
import CustomButton from './CustomButton';

const Header = () => {
  const [user, setUser] = useState(null);
  const [data, setData] = useState({ body: '' });

  useEffect(() => {
    // Obtener el usuario de localStorage cuando el componente se monta
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleChange = (e) => {
    setData({ body: e.target.value });
  };

  const logout = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8080/api/users/logout',
        {},
        { withCredentials: true }, // Esto asegura que las cookies se envíen con la solicitud
      );
      if (response.status === 204) {
        // Eliminar el usuario de localStorage y del estado
        localStorage.removeItem('user');
        setUser(null);
        // Redireccionar al login
        window.location.href = '/auth';
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };
  return (
    <>
      {user && (
        <header className="py-8 xl:py-3 text-white">
          <div className="container mx-auto flex justify-between items-center">
            {/* Logo */}
            <Link href="/">
              <h1 className="text-4xl font-semibold text-accent">TMDB</h1>
            </Link>

            {/* Search bar */}
            <div className="xl:hidden">
              <SearchBar change={handleChange} />
            </div>

            {/* Desktop nav and button login/logout and avatar */}
            <div className="hidden xl:flex items-center gap-12">
              <Nav />
              <CustomButton text={'logout'} onClick={logout} />
              <Avatar />
            </div>

            {/* Mobile nav */}
            <div className="xl:hidden flex items-center gap-6">
              <Avatar />
              <MobileNav />
            </div>
          </div>
        </header>
      )}
    </>
  );
};

export default Header;
