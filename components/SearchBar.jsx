import { useEffect, useState } from 'react';
import { BiSearchAlt } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import { fetchMovies, clearMovies } from '@/app/store/searchSlice';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch();

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      dispatch(fetchMovies(searchQuery));
    }
  };

  useEffect(() => {
    // Limpiar el estado cuando el campo de búsqueda esté vacío
    if (searchQuery.trim() === '') {
      dispatch(clearMovies());
    }
  }, [searchQuery, dispatch]);

  return (
    <div className="flex items-center justify-center bg-gradient-to-br focus:border-acc">
      <form onSubmit={handleSearchSubmit} className="relative mx-auto flex">
        <input
          type="search"
          value={searchQuery}
          onChange={handleSearchChange}
          className="text-xs peer cursor-pointer relative z-10 h-8 w-10 rounded-lg border bg-transparent pr-6 outline-none focus:rounded-r-none focus:w-full focus:cursor-text focus:border-accent focus:px-3"
          placeholder="search for your movie"
        />
        <button
          type="submit"
          className="absolute top-0 right-0 bottom-0 my-auto h-8 w-10 px-3 bg-white/10 rounded-lg peer-focus:relative peer-focus:rounded-l-none ">
          <BiSearchAlt className="text-white hover:text-accent" />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
