import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import { Loader, Lock, Mail, User } from "lucide-react";
import Input from '../conponents/auth/Input';
import PasswordSecurity from '../conponents/auth/PasswordSecurity';
import { useAuthStore } from '../store/authStore';



const SignUpPage = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { signup, error, isLoading } = useAuthStore();

  const handleSignUp = async (e) => {
    e.preventDefault();

      try {
      await signup(email, password, name);
      navigate("/verify-email")
    } catch (error) {
      console.log(error);
      
    } 
  }; 


  return (
    <motion.div
     initial={{ opacity: 0, y:20 }}
     animate={{ opacity: 1, y:0}}
     transition={{ duration:0.5 }}
     className=' max-w-md w-full bg-blue-700 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden z-0'
     >
      <div className='w-full max-w-md p-8 space-y-6 bg-blue-950/80 rounded-lg shadow-md'>
        <h1 className='text-center text-white text-2xl font-bold mb-4'>
          Create account
        </h1>

        <form onSubmit={handleSignUp} className='space-y-4'>
          <Input
            icon={User}
            type='text'
            placeholder='Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
          {error && <p className='text-red-500 font-semibold mt-2'>{error}</p>}

          <PasswordSecurity password={password} />

          <motion.button className='mt-5 w-full py-3 px-4 bg-gradient-to-r from-sky-600 to-blue-600 text-white font-bold rounded-lg shadow-lg
            hover:from-sky-800 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200'
            whileHover={{ scale:1.02 }}
            whileTap={{ scale: 0.98 }}
            type='submit'
            disabled={isLoading}
          >
            {isLoading ? <Loader className='animate-spin mx-auto' size={24} /> : "Sign up" }
          </motion.button>
        </form> 
      </div>
      <div className='px-8 py-4 bg-gray-700 bg-opacity-90 flex justify-center'>
        <p className='text-sm text-gray-400'>
          Already have an account?{" "}
          <Link to={"/login"} className='text-white hover:font-medium'>
          Log in
          </Link>
        </p>
      </div>
    </motion.div >
  
  );
}

export default SignUpPage
