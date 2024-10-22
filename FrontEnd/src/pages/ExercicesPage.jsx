import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { motion } from "framer-motion";

const ExercisesPage = () => {
  const { bodypart } = useParams(); 
  const [exercises, setExercises] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Page courante
  const exercisesPerPage = 5;
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);


  const handleExerciceClick = (exercise) => {
    setSelectedExercise(exercise); 
    setIsModalOpen(true); 
}; 

    
  

  useEffect(() => {
    const fetchExercises = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:5000/api/exercices/${bodypart}`);
        setExercises(response.data.exercises); 
        setLoading(false)
      } catch (err) {
        setError(err.message);
      } 
    };

    fetchExercises();
  }, [bodypart]);

  const indexOfLastExercise = currentPage * exercisesPerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
  const currentExercises = exercises.slice(indexOfFirstExercise, indexOfLastExercise);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  
  if (error) return <p>Error: {error}</p>;

    return (
      <div className="mx-auto p-4">
        <h1 className='text-center text-5xl m-24 text-gray-400 bg-gradient-to-r from-slate-800/80 to-sky-600/80 p-10 rounded-lg'>Exercices for {bodypart}</h1>
      <div className="grid grid-cols-5 gap-6">
        {!isLoading && currentExercises.map((exercise) => (
          <div onClick={() => handleExerciceClick(exercise)} key={exercise.id} className="exercise-card bg-slate-900 shadow-lg rounded-md p-4 scale-90 hover:scale-105">
            <h2 className="text-lg font-bold text-center text-white mb-5">{exercise.name}</h2>
            <img 
              src={exercise.gifUrl} 
              alt={exercise.name} 
              className="w-full h-auto object-cover rounded-md"
            />
          </div>
        ))}
        {isLoading &&
          [...Array(5)].map((_, index) => (
          <div key={index} className="skeleton grid grid-cols-5 size-80 m-5 bg-white"></div>
        ))}
      </div>

      <div className="flex justify-center mt-8 space-x-4">
        {Array.from({ length: Math.ceil(exercises.length / exercisesPerPage) }).map((_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={`px-4 py-2 rounded-lg ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      


      {isModalOpen && selectedExercise && (
      <motion.div
      initial={{ opacity: 0, y:20 }}
      animate={{ opacity: 1, y:0}}
      transition={{ duration:0.5 }}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-5 rounded shadow-lg w-1/3">
          <h2 className="text-xl font-bold">{selectedExercise.name}</h2>
          <p className="mt-2">{selectedExercise.instructions}</p> 
          <h3 className="mt-4 font-semibold">Muscles secondaires:</h3>
          <p>{selectedExercise.secondaryMuscles.join(', ')}</p> 
          <button 
            onClick={() => setIsModalOpen(false)} 
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Close
          </button>
        </div>
      </motion.div>
      )};
    </div>
  );
};
export default ExercisesPage;
