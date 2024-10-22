import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import NavBar from '../conponents/General/NavBar';

const HomePage = () => {

const [bodyParts, setBodyParts] = useState([]);
const [isLoading, setLoading] = useState()

  useEffect(() =>{
    const bodyPartsList = async () => {
      setLoading(true)
      try {
        const response = await axios.get(`http://localhost:5000/api/exercices/bodypart`);
        setBodyParts(response.data.content);
        setLoading(false)
      } catch (error) {
        console.error('Error fetching body parts:', error);
      } 
    };
    bodyPartsList();
  }, []);

  
  
    

  return (
    
    <motion.div>
      <h1 className='py-10 font-black text-8xl md:text-7xl bg-gradient-to-r from-blue-900 to-sky-600 mix-blend-lighten uppercase text-center rounded-lg'>Select your<br></br> Body Parts</h1>
      <ul className='grid grid-cols-5'>
        {!isLoading && bodyParts.map((part, index) => (
          <Link key={index} to={`http://localhost:5173/exercises/${part}`}>
            <motion.li
            initial={{ opacity: 0, y:20 }}
            animate={{ opacity: 1, y:0}}
            transition={{ duration:0.5 }}
            className='flex items-center justify-center text-2xl bg-gradient-to-r from-blue-800/50 to-sky-600/80 m-5 size-56 rounded-md shadow
            hover:bg-gradient-to-r hover:from-blue-900/90 hover:to-sky-800/90 hover:scale-110' key={index}>{part}
            </motion.li>
          </Link>
        ))}
        {isLoading &&
          [...Array(10)].map((_, index) => (
          <div key={index} className="skeleton size-56 m-5 bg-white"></div>
        ))}
      </ul>
    </motion.div>
    
  );
};

export default HomePage
