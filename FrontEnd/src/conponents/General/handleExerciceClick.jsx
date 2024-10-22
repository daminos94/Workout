import React, { useState } from 'react'


const onClickDetail = () => {




  return (
    <div>
    {isModalOpen && selectedExercise && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-5 rounded shadow-lg w-1/3">
                <h2 className="text-xl font-bold">{selectedExercise.name}</h2>
                <p className="mt-2">{selectedExercise.description}</p> {/* Ajoute une description */}
                <h3 className="mt-4 font-semibold">Muscles secondaires:</h3>
                <p>{selectedExercise.secondaryMuscles.join(', ')}</p> {/* Liste des muscles secondaires */}
                <button 
                  onClick={() => setIsModalOpen(false)} 
                  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Close
                </button>
            </div>
        </div>
    )}
    </div>
  );
}


export default onClickDetail
