import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { apiClient } from '../services/config';
import { toast } from 'react-toastify';

const CourseProgress = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourseProgress = async () => {
      try {
        const token = localStorage.getItem('token');
        // Fetch course details
        const courseResponse = await apiClient.get(`/courses/${courseId}`);
        setCourse(courseResponse.data);

        // Fetch progress
        const progressResponse = await apiClient.get(`/courses/${courseId}/progress`);
        setProgress(progressResponse.data.progress || 0);
      } catch (error) {
        console.error('Error fetching course progress:', error);
        toast.error('Failed to load course progress');
      } finally {
        setLoading(false);
      }
    };

    fetchCourseProgress();
  }, [courseId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        {/* Course Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {course?.title}
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Track your progress and continue learning
          </p>
        </div>

        {/* Progress Section */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Course Progress
          </h2>
          <div className="bg-gray-100 dark:bg-gray-700 rounded-full h-4 mb-2">
            <div
              className="bg-cyan-500 h-4 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {progress}% Complete
          </p>
        </div>

        {/* Action Button - Centered */}
        <div className="flex justify-center">
          <Link
            to={`/modules/${courseId}`}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-lg hover:opacity-90 transition-colors"
          >
            Continue Learning
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseProgress; 