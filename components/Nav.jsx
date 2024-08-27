'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

//components
import SearchBar from './SearchBar';

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

const Nav = () => {
  const pathname = usePathname();
  const [data, setData] = useState({ body: '' });

  const handleChange = (e) => {
    setData({ body: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes manejar la lógica de búsqueda con data.body
    console.log('Buscando:', data.body);
    // Reiniciar el campo de búsqueda si es necesario
    // setData({ body: '' });
  };

  return (
    <nav className="flex gap-8">
      <SearchBar change={handleChange} submit={handleSubmit} />
      {links.map((link, index) => {
        return (
          <Link
            href={link.path}
            key={index}
            className={`${
              link.path === pathname && 'text-accent border-b-2 border-accent'
            } capitalize font-medium hover:text-accent transition-all`}>
            {link.name}
          </Link>
        );
      })}
    </nav>
  );
};

export default Nav;
