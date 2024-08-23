import Link from 'next/link';
import { SlLogin, SlLogout } from 'react-icons/sl';

const CustomButton = ({ text, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="group relative inline-block overflow-hidden rounded border border-primary/60 bg-primary  px-6 py-2 text-xs font-medium text-white hover:text-accent focus:outline-none focus:ring ring-primary active:bg-accent/60 active:text-white">
      <span className="ease absolute left-0 top-0 h-0 w-0 border-t-2 border-accent transition-all duration-200 group-hover:w-full"></span>
      <span className="ease absolute right-0 top-0 h-0 w-0 border-r-2 border-accent transition-all duration-200 group-hover:h-full"></span>
      <span className="ease absolute bottom-0 right-0 h-0 w-0 border-b-2 border-accent transition-all duration-200 group-hover:w-full"></span>
      <span className="ease absolute bottom-0 left-0 h-0 w-0 border-l-2 border-accent transition-all duration-200 group-hover:h-full"></span>
      <span className="flex justify-center flex-wrap p-2">
        {text} <SlLogout className="text-sm " />
      </span>
    </div>
  );
};

export default CustomButton;
