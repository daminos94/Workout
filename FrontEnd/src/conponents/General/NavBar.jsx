import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { User, X } from "lucide-react";
import { motion } from "framer-motion";
import { useAuthStore } from '../../store/authStore';

const NavBar = () => {

  const [ isModalOpen, setIsModalOpen ] = useState(false)
  const { isAuthenticated, user, checkAuth, logout } = useAuthStore();
  

  useEffect(() => {
    checkAuth()
   },[checkAuth]);

  const handleUserClick = () => {
    setIsModalOpen((prevState) => !prevState); 
  };

  const handleLogout = () => {
    logout();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className='flex justify-around py-4 items-center sticky top-0 w-full bg-gradient-to-r from-red-400/80 via-slate-500 to-red-900 h-16 mb-10'>
      <div className='flex flex-row justify-center items-center'>
        <h2 className='font-semibold p-3 text-lg tracking-wider text-gray-900/80 cursor-default'>Exercice</h2>
        <Link to={"/"}>
            <img src="/favicon-32x32.png" alt="logo" className='size-12' /> 
        </Link> 
      </div>
      <div className='flex justify-around items-center w-48'>
        <Link>
            Favorites
        </Link>
        <Link>
            Workout
        </Link>
      </div>
      <div className='flex justify-around items-center gap-5'>
         <User className={`hover:bg-slate-300/50 rounded-xl cursor-pointer ${isModalOpen ? 'bg-slate-300/80' : 'bg-transparent'}`} onClick={() => handleUserClick()}/>
      </div>
      {isModalOpen && (
      <motion.div
      initial={{ opacity: 0, y:20 }}
      animate={{ opacity: 1, y:0}}
      transition={{ duration:0.5 }}
      className="fixed flex justify-between flex-col bg-gradient-to-t from-red-600/80 to-red-900/80 p-5 rounded shadow-lg right-16 top-20 z-10 ">
        {isAuthenticated ? (
          <div>
          <h1>welcome {user.name}</h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={handleLogout}
            className='w-full mt-3 py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700'
          >
            Logout
          </motion.button>
        </div>
        ) : (
          <div>
          <Link to="/signup" onClick={handleCloseModal} className='m-5 w-full text-lg font-semibold hover:underline'>Signup</Link>
          <Link to="/login" onClick={handleCloseModal} className='mx-5 w-full text-lg font-semibold hover:underline'>Login</Link>
          <X 
            onClick={() => setIsModalOpen(false)} 
            className="top-1 right-1 fixed"
          
            Close
          />
          </div>
        )}
      </motion.div>
      )}
    </div>
  )
}

export default NavBar
