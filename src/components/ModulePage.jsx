import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ModulePage = () => {
  const [modules, setModules] = useState([]); // Initialize with an empty array
  const [loading, setLoading] = useState(true); // To track the loading state
  const [error, setError] = useState(null); // To store any error

  // Fetching modules from API
  useEffect(() => {
    axios.get('/api/modules') // Replace with your actual API endpoint
      .then(response => {
        setModules(response.data); // Assume response.data is an array
        setLoading(false);
      })
      .catch(error => {
        setError('Failed to fetch modules');
        setLoading(false);
      });
  }, []);

  // Rendering logic based on loading and error states
  if (loading) {
    return <div className="text-center text-xl">Loading modules...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 text-xl">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold text-center mb-8">Modules</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.isArray(modules) && modules.length > 0 ? (
          modules.map((module, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">{module.title}</h2>
              <p className="text-gray-600">{module.description}</p>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-600">No modules available</p>
        )}
      </div>
    </div>
  );
};

export default ModulePage;
