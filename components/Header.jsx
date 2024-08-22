'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Button } from './ui/button';

//components
import Nav from './Nav';
import MobileNav from './MobileNav';
import SearchBar from './SearchBar';
import Avatar from './Avatar';
import CustomButton from './CustomButton';

const Header = () => {
  const [data, setData] = useState({ body: '' });
  const handleChange = (e) => {
    setData({ body: e.target.value });
  };

  return (
    <header className="py-8 xl:py-3 text-white">
      <div className="container mx-auto flex justify-between items-center">
        {/*logo */}
        <Link href="/">
          <h1 className="text-4xl font-semibold text-accent">TMDB</h1>
        </Link>

        {/*search bar */}
        <div className="xl:hidden">
          {' '}
          <SearchBar change={handleChange} />
        </div>
        {/*desktop nav and button login/logout and avatar */}
        <div className="hidden xl:flex items-center gap-12">
          <Nav />
          <CustomButton text={"logout"}/>
          {/*usar cuando el usuario este logueado y colocarle su imagen, si no hay un usuario
          logueado poner imagen en negro */}
          <Avatar />
        </div>

        {/*mobile nav */}

        <div className="xl:hidden flex items center gap-6">
          <Avatar />
          <MobileNav />
        </div>
      </div>
    </header>
  );
};

export default Header;
