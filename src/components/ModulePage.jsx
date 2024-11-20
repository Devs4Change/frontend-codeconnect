import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { apiClient } from '../services/config';
import { toast } from 'react-toastify';

const ModulePage = () => {
  const { courseId } = useParams();
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentModule, setCurrentModule] = useState(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const token = localStorage.getItem('token');
        // Fetch modules and progress
        const [modulesResponse, progressResponse] = await Promise.all([
          apiClient.get(`/courses/${courseId}/modules`),
          apiClient.get(`/courses/${courseId}/progress`)
        ]);
        
        setModules(modulesResponse.data);
        setProgress(progressResponse.data.progress || 0);
        
        // Set first module as current if available
        if (modulesResponse.data.length > 0) {
          setCurrentModule(modulesResponse.data[0]);
        }
      } catch (error) {
        console.error('Error fetching modules:', error);
        toast.error('Failed to load course modules');
      } finally {
        setLoading(false);
      }
    };

    fetchModules();
  }, [courseId]);

  const handleModuleCompletion = async (moduleId) => {
    try {
      // Mark module as complete in backend
      await apiClient.post(`/courses/${courseId}/modules/${moduleId}/complete`);
      
      // Fetch updated progress
      const progressResponse = await apiClient.get(`/courses/${courseId}/progress`);
      setProgress(progressResponse.data.progress);
      
      // Update modules list to show completion
      const updatedModules = modules.map(module => 
        module._id === moduleId ? { ...module, isCompleted: true } : module
      );
      setModules(updatedModules);
      
      toast.success('Module completed!');
    } catch (error) {
      toast.error('Failed to mark module as complete');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Progress Bar */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Course Progress</h2>
          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">{progress}%</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
          <div 
            className="bg-cyan-500 h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Module List Sidebar */}
        <div className="md:col-span-1 bg-white dark:bg-gray-800 rounded-lg p-4">
          <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Course Modules</h2>
          <div className="space-y-2">
            {modules.map((module, index) => (
              <button
                key={module._id}
                onClick={() => setCurrentModule(module)}
                className={`w-full text-left p-3 rounded-lg transition-colors ${
                  currentModule?._id === module._id
                    ? 'bg-cyan-50 dark:bg-cyan-900 text-cyan-600 dark:text-cyan-300'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-gray-900 dark:text-white">Module {index + 1}</span>
                  {module.isCompleted && (
                    <span className="text-green-500">✓</span>
                  )}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{module.title}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Current Module Content */}
        <div className="md:col-span-3 bg-white dark:bg-gray-800 rounded-lg p-6">
          {currentModule ? (
            <>
              <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                {currentModule.title}
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {currentModule.description}
              </p>
              
              {/* Module Content */}
              <div className="prose dark:prose-invert max-w-none mb-6">
                {currentModule.content}
              </div>

              {/* Complete Module Button */}
              {!currentModule.isCompleted && (
                <button
                  onClick={() => handleModuleCompletion(currentModule._id)}
                  className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
                >
                  Mark as Complete
                </button>
              )}
            </>
          ) : (
            <p className="text-gray-600 dark:text-gray-400">Select a module to begin</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModulePage;
