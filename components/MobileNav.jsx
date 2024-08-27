'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { CiMenuFries } from 'react-icons/ci';
import CustomButton from './CustomButton';

const links = [
  {
    name: 'home',
    path: '/',
  },
  {
    name: 'favorite',
    path: '/work',
  },

  {
    name: 'Genres',
    path: '/contact',
  },
];

const MobileNav = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
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
        { withCredentials: true }, // Esto asegura que las cookies se envíen con la solicitud
      );
      if (response.status === 204) {
        // Eliminar el usuario de localStorage y del estado
        localStorage.removeItem('user');
        setUser(null);
        // Redireccionar al login
        window.location.href = '/login';
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger className="flex justify-center items-center">
        <CiMenuFries className="text-[32px] text-accent" />
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        {/*logo */}
        <div className="mt-32 mb-40 text-center text-2xl">
          <Link href="/" onClick={handleLinkClick}>
            <h1 className="text-4xl font-semibold text-accent">TMDB</h1>
          </Link>
        </div>
        {/* nav */}
        <nav className="flex flex-col justify-center items-center gap-8">
          {links.map((link, index) => {
            return (
              <Link
                href={link.path}
                key={index}
                className={`${
                  link.path === pathname &&
                  'text-accent border-b-2 border-accent'
                } text-xl capitalize hover:text-accent transition-all`}
                onClick={handleLinkClick}>
                {link.name}
              </Link>
            );
          })}
        </nav>
        <CustomButton text={'logout'} onClick={logout} />
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
