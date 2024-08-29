'use client';

import { useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';

import { useDispatch } from 'react-redux';
import { login } from '../store/slice';

const Login = () => {
  const [authenticator, setAuthenticator] = useState(false);
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const handleAuth = (e) => {
    e.preventDefault();
    setAuthenticator(!authenticator);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const registerData = { name, lastname, email, password };
    const loginData = { email, password };
    try {
      const response = await axios.post(
        'http://localhost:8080/api/users/register',
        registerData,
      );
      if (response.status === 201) {
        console.log('El usuario se registro con exito');
        try {
          const response = await axios.post(
            'http://localhost:8080/api/users/login',
            loginData,
            { withCredentials: true },
          );

          if (response.status === 200) {
            // Si la autenticación es exitosa
            console.log('Login successful!');

            localStorage.setItem('user', JSON.stringify(response.data));
            dispatch(login(response.data)); //----> seteo el estado global del usuario.
            window.location.href = '/'; // Redireccionar o hacer algo más después del login
          } else {
            // Manejar errores
            console.error('Login failed!');
          }
        } catch (error) {
          console.error('An error occurred:', error);
        }
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log('Hubo un error en la solicitud');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginData = {
      email,
      password,
    };

    try {
      const response = await axios.post(
        'http://localhost:8080/api/users/login',
        loginData,
        { withCredentials: true },
      );

      if (response.status === 200) {
        // Si la autenticación es exitosa
        console.log('Login successful!');
        console.log(response.data);
        localStorage.setItem('user', JSON.stringify(response.data));
        dispatch(login(response.data)); //----> seteo el estado global del usuario.
        window.location.href = '/'; // Redireccionar o hacer algo más después del login
      } else {
        // Manejar errores
        console.error('Login failed!');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };
  return (
    <>
      {!authenticator ? (
        <div className="bg-primary flex justify-center items-center h-screen">
          {/* Left: Image */}
          <div className="w-1/2 h-screen hidden lg:block">
            <Image
              width={800}
              height={800}
              src="/assets/login/pochoclos.jpg"
              alt="Placeholder Image"
              className="object-cover w-full h-full"
            />
          </div>
          {/* Right: Login Form */}
          <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
            <h1 className="text-4xl text-center font-bold text-accent mb-4">
              TMDB
            </h1>
            <h2 className="text-2xl  text-center font-semibold mb-4">Login</h2>
            <form onSubmit={handleSubmit}>
              {/* Username Input */}
              <div className="mb-4">
                <label htmlFor="email" className="block text-white/80">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none text-primary focus:border-accent"
                  autoComplete="off"
                />
              </div>
              {/* Password Input */}
              <div className="mb-4">
                <label htmlFor="password" className="block text-white/80">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none text-primary focus:border-accent"
                  autoComplete="off"
                />
              </div>
              {/* Login Button */}
              <button
                type="submit"
                className="bg-accent/80 hover:bg-accent text-primary font-semibold rounded-md py-2 px-4 w-full">
                Login
              </button>
            </form>
            {/* Sign up */}
            <div className="mt-6 text-white/80 text-center">
              <Link
                href="/"
                onClick={handleAuth}
                className="hover:underline undeline-accent">
                Sign up Here
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-primary flex justify-center items-center h-screen">
          {/* Left: Image */}
          <div className="w-1/2 h-screen hidden lg:block">
            <Image
              width={800}
              height={800}
              src="/assets/login/pochoclos.jpg"
              alt="Placeholder Image"
              className="object-cover w-full h-full"
            />
          </div>
          {/* Right: Login Form */}
          <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
            <h1 className="text-4xl text-center font-bold text-accent mb-4">
              TMDB
            </h1>
            <h2 className="text-2xl  text-center font-semibold mb-4">
              Register
            </h2>
            <form onSubmit={handleRegister}>
              {/*name input */}
              <div className="mb-4">
                <label htmlFor="name" className="block text-white/80">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none text-primary focus:border-accent"
                  autoComplete="off"
                />
              </div>
              {/*lastname input */}
              <div className="mb-4">
                <label htmlFor="lastname" className="block text-white/80">
                  Lastname
                </label>
                <input
                  type="text"
                  id="lastname"
                  name="lastname"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none text-primary focus:border-accent"
                  autoComplete="off"
                />
              </div>
              {/* Email Input */}
              <div className="mb-4">
                <label htmlFor="email" className="block text-white/80">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none text-primary focus:border-accent"
                  autoComplete="off"
                />
              </div>
              {/* Password Input */}
              <div className="mb-4">
                <label htmlFor="password" className="block text-white/80">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none text-primary focus:border-accent"
                  autoComplete="off"
                />
              </div>
              {/* Login Button */}
              <button
                type="submit"
                className="bg-accent/80 hover:bg-accent text-primary font-semibold rounded-md py-2 px-4 w-full">
                Register
              </button>
            </form>
            {/* Sign up */}
            <div className="mt-6 text-white/80 text-center ">
              <span>Already have an account? </span>
              <Link
                href="/"
                onClick={handleAuth}
                className="hover:underline undeline-accent">
                Login here
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
