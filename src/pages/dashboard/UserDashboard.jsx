// client/src/pages/UserDashboard.js

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiClient } from '../../services/config';
import { toast } from 'react-toastify';

const UserDashboard = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalCourses: 0,
    completedCourses: 0,
    inProgress: 0
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const profileResponse = await apiClient.get('/users/me', {
          headers: { Authorization: `Bearer ${token}` }
        });

        const enrolledCourseIds = profileResponse.data.enrolledCourses || [];
        console.log('Total Enrolled Courses:', enrolledCourseIds.length); // Debug log

        if (enrolledCourseIds.length > 0) {
          try {
            // Fetch details for each enrolled course
            const coursesPromises = enrolledCourseIds.map(courseId =>
              apiClient.get(`/courses/${courseId}`, {
                headers: { Authorization: `Bearer ${token}` }
              })
            );

            const coursesResponses = await Promise.all(coursesPromises);
            const coursesData = coursesResponses
              .filter(response => response.data) // Filter out any null responses
              .map(response => ({
                ...response.data,
                progress: response.data.progress || 0 // Ensure progress has a default value
              }));

            setEnrolledCourses(coursesData);

            // Update stats based on the total number of enrolled courses
            setStats({
              totalCourses: enrolledCourseIds.length, // Use the total from enrolledCourseIds
              completedCourses: coursesData.filter(course => course.progress === 100).length,
              inProgress: enrolledCourseIds.length - coursesData.filter(course => course.progress === 100).length
            });

          } catch (error) {
            console.error('Error fetching course details:', error);
            toast.error('Failed to load some course details');
            
            // Even if course details fail, still show total enrolled courses
            setStats({
              totalCourses: enrolledCourseIds.length,
              completedCourses: 0,
              inProgress: enrolledCourseIds.length
            });
          }
        } else {
          setStats({
            totalCourses: 0,
            completedCourses: 0,
            inProgress: 0
          });
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast.error('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-cyan-600 to-cyan-500 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">
          Welcome back, {localStorage.getItem('userName')}!
        </h1>
        <p className="text-cyan-50">Continue your learning journey</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
          <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Total Courses</h3>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.totalCourses}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
          <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Completed</h3>
          <p className="text-3xl font-bold text-green-600">{stats.completedCourses}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
          <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">In Progress</h3>
          <p className="text-3xl font-bold text-cyan-600">{stats.inProgress}</p>
        </div>
      </div>

      {/* Recent Activity & Continue Learning */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Continue Learning Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Continue Learning</h2>
          {enrolledCourses.length > 0 ? (
            <div className="space-y-4">
              {enrolledCourses.slice(0, 3).map((course) => course && (
                <div key={course._id} className="border dark:border-gray-700 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{course.title}</h3>
                  <div className="mb-3">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-cyan-500 h-2 rounded-full"
                        style={{ width: `${course.progress || 0}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {course.progress || 0}% Complete
                    </p>
                  </div>
                  <Link
                    to={`/course-progress/${course._id}`}
                    className="inline-block bg-cyan-500 text-white px-4 py-2 rounded-lg hover:bg-cyan-600 transition-colors text-sm"
                  >
                    Resume Course
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 dark:text-gray-400">No courses in progress</p>
          )}
        </div>

        {/* Recommended Courses */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Recommended Courses</h2>
          <div className="space-y-4">
            <Link
              to="/courses"
              className="block border dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">HTML & CSS Basics</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Learn the fundamentals of web development</p>
                </div>
                <span className="text-cyan-500">→</span>
              </div>
            </Link>
            <Link
              to="/courses"
              className="block border dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">JavaScript Essentials</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Master JavaScript programming</p>
                </div>
                <span className="text-cyan-500">→</span>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* All Enrolled Courses */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">My Courses</h2>
        
        {enrolledCourses.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600 dark:text-gray-400">You haven't enrolled in any courses yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolledCourses.map((course) => course && (
              <div key={course._id || course.id} className="border rounded-lg overflow-hidden">
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{course.title || 'Untitled Course'}</h3>
                  <div className="mb-4">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-cyan-500 h-2.5 rounded-full"
                        style={{ width: `${course.progress || 0}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {course.progress || 0}% Complete
                    </p>
                  </div>
                  <Link
                    to={`/course-progress/${course._id}`}
                    className="block text-center bg-gray-100 text-gray-700 px-4 py-2 rounded hover:bg-gray-200 transition-colors"
                  >
                    Continue Learning
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
