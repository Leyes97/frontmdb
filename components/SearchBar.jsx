import { BiSearchAlt } from 'react-icons/bi';

const SearchBar = ({ value, onChange, onSubmit }) => {
  return (
    <div className="flex items-center justify-center bg-gradient-to-br">
      <form onSubmit={onSubmit} className="relative mx-auto flex">
        <input
          type="search"
          value={value}
          onChange={onChange}
          className="text-xs peer cursor-pointer relative z-10 h-8 w-10 rounded-lg border bg-transparent pr-6 outline-none focus:rounded-r-none focus:w-full focus:cursor-text focus:border-taupeGray focus:px-3"
          placeholder="search for your movie"
        />
        <button
          type="submit"
          className="absolute top-0 right-0 bottom-0 my-auto h-8 w-10 px-3 bg-white/20 rounded-lg peer-focus:relative peer-focus:rounded-l-none">
          <BiSearchAlt className="text-white" />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
