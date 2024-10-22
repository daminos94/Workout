import React from 'react';
import { useState } from 'react';
import { motion } from "framer-motion";
import { Lock, Mail, Loader } from "lucide-react";
import { Link } from 'react-router-dom';
import Input from '../conponents/auth/Input';
import { useAuthStore } from '../store/authStore';


const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error } = useAuthStore();

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(email, password);
  };


  return (
    <motion.div
    initial={{ opacity: 0, y:20 }}
    animate={{ opacity: 1, y:0}}
    transition={{ duration:0.5 }}
    className=' max-w-md w-full bg-blue-700 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'
    >
      <div className='w-full max-w-md p-8 space-y-6 bg-blue-950/80 rounded-lg shadow-md'>
        <div className='p-8'>
          <h2 className='text-3xl font-bold text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text'>
            Welcome Back
          </h2>
        </div>

        <form
          onSubmit={handleLogin}
        >
          <Input
              icon={Mail}
              type='email'
              placeholder='Adress email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
            icon={Lock}
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className='flex items-center'>
            <Link to={"/forgot-password"} className='text-white hover:font-medium'>
              Forgot password ?
            </Link>
          </div>
          {error && <p className='text-red-500 font-semibold mb-2'>{error}</p>}

          <motion.button className='mt-5 w-full py-3 px-4 bg-gradient-to-r from-sky-600 to-blue-600 text-white font-bold rounded-lg shadow-lg
            hover:from-sky-800 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200'
            whileHover={{ scale:1.02 }}
            whileTap={{ scale: 0.98 }}
            type='submit'
            disabled={isLoading}
          >
            {isLoading ? <Loader className='w-6 h-6 animate-spin mx-auto' /> : "login" }
          </motion.button>
        </form>        
      </div>
      <div className='px-8 py-4 bg-gray-700 bg-opacity-90 flex justify-center'>
        <p className='text-sm text-gray-400'>
          Don't have an account?{" "}
          <Link to={"/signup"} className='text-white hover:font-medium'>
          Sign up
          </Link>
        </p>
      </div>
    </motion.div>
  )
}

export default LoginPage
