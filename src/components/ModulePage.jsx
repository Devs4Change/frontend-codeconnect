import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiClient } from '../services/config';
import Navbar from './Navbar';
import Footer from './Footer';

const ModulePage = () => {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { courseType } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const validCourseTypes = ['html', 'css', 'javascript'];
    
    const loadModules = async () => {
      if (!courseType) {
        setError('Course type is required');
        setLoading(false);
        return;
      }

      const normalizedCourseType = courseType.toLowerCase();

      if (!validCourseTypes.includes(normalizedCourseType)) {
        setError('Invalid course type');
        setLoading(false);
        navigate('/courses');
        return;
      }

      try {
        setLoading(true);
        const response = await apiClient.get(`/modules/${normalizedCourseType}`);
        const data = response.data;
        
        // Sort modules to ensure "Introduction to ..." is first
        const sortedModules = data.sort((a, b) => {
          if (a.title.toLowerCase().startsWith('introduction to')) return -1;
          if (b.title.toLowerCase().startsWith('introduction to')) return 1;
          return a.order - b.order || a.title.localeCompare(b.title);
        });
        
        setModules(sortedModules);
      } catch (err) {
        console.error('Error loading modules:', err);
        setError(err.message || 'Failed to load modules');
      } finally {
        setLoading(false);
      }
    };

    loadModules();
  }, [courseType, navigate]);

  const renderContent = (content, moduleId) => {
    if (!content) return null;
    
    if (typeof content === 'string') {
      return (
        <div key={`${moduleId}-content`} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-md">
          <p className="text-gray-700 dark:text-gray-200 whitespace-pre-wrap">{content}</p>
        </div>
      );
    }
    
    if (Array.isArray(content)) {
      return content.map((item, index) => (
        <div 
          key={`${moduleId}-${index}`}
          className="p-4 bg-gray-50 dark:bg-gray-700 rounded-md"
        >
          <p className="text-gray-700 dark:text-gray-200 whitespace-pre-wrap">{item}</p>
        </div>
      ));
    }

    return (
      <div key={`${moduleId}-json`} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-md">
        <p className="text-gray-700 dark:text-gray-200">
          {JSON.stringify(content, null, 2)}
        </p>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
          <div className="text-red-500">Error loading modules: {error}</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-8 pt-24 flex-grow">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white capitalize">
            {courseType} Learning Path
          </h1>
          
          <div className="space-y-6 mb-8">
            {modules.map((module, index) => (
              <div 
                key={module._id || index} 
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
              >
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-cyan-500 text-white rounded-full flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                        {module.title}
                      </h2>
                      {module.description && (
                        <p className="text-gray-600 dark:text-gray-300 mt-1">
                          {module.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  {renderContent(module.content, module._id)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ModulePage;
