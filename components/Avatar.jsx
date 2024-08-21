import Image from 'next/image';

const Avatar = ({ src }) => {
  return (
    <div className="relative inline-block cursor-pointer">
      <Image
        alt="user 1"
        width={48}
        height={48}
        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
        className="h-12 w-12 rounded-full border-2 border-white object-cover object-center hover:z-10 focus:z-10"
      />
    </div>
  );
};

export default Avatar;
