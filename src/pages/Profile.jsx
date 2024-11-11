// client/src/pages/Profile.js
import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

const Profile = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    avatar: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  // Get the token and user data from localStorage
  const token = localStorage.getItem('token');
  const storedUserData = JSON.parse(localStorage.getItem('userData')) || {};

  // Initialize the user data from localStorage (if available)
  useEffect(() => {
    if (storedUserData && token) {
      setUserData((prevUserData) => {
        // Only update state if it's different from the current state
        if (prevUserData.name !== storedUserData.name || prevUserData.email !== storedUserData.email || prevUserData.avatar !== storedUserData.avatar) {
          return {
            name: storedUserData.name,
            email: storedUserData.email,
            avatar: storedUserData.avatar // If avatar exists in storedUserData
          };
        }
        return prevUserData; // Avoid unnecessary updates
      });
    } else {
      toast.error('User data not found. Please log in.');
    }
  }, [storedUserData, token]); // Add storedUserData and token as dependencies to avoid unnecessary re-renders

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', e.target.name.value);
    formData.append('avatar', e.target.avatar.files[0] || userData.avatar); // If no new avatar is selected, retain the old one.

    setIsLoading(true);
    try {
      if (!token) {
        toast.error('User is not authenticated');
        return;
      }

      const response = await axios.patch(
        'https://code-connect-api.onrender.com/users/profile',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log('Profile updated successfully:', response.data);
      toast.success('Profile updated successfully!');
      
      // Update local storage with the new user data
      localStorage.setItem('userData', JSON.stringify(response.data));

      // Optionally, update state to reflect changes
      setUserData({
        ...userData,
        name: response.data.name,
        avatar: response.data.avatar // Update avatar in state after successful submission
      });

    } catch (error) {
      console.error('Error updating profile:', error.response || error);
      toast.error(error.response?.data?.message || 'Error updating profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-10 sm:px-6 lg:px-8 bg-blue-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 shadow-2xl rounded-lg sm:rounded-3xl w-full max-w-md sm:max-w-lg mx-auto mt-10 sm:mt-20">
        <h2 className="text-xl sm:text-2xl text-cyan-600 dark:text-cyan-400 font-bold mb-4 sm:mb-6 text-center">
          Update Profile
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div>
            <label className="block text-sm sm:text-base text-gray-700 dark:text-gray-300 mb-1">
              Name:
            </label>
            <input
              type="text"
              name="name"
              defaultValue={userData.name || ''}
              className="w-full px-4 py-2 sm:py-3 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-2 border-transparent focus:border-cyan-500 rounded-full shadow-md hover:shadow-lg transition-shadow duration-200 ease-in-out focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm sm:text-base text-gray-700 dark:text-gray-300 mb-1">
              Email:
            </label>
            <input
              type="email"
              name="email"
              defaultValue={userData.email || ''}
              className="w-full px-4 py-2 sm:py-3 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-2 border-transparent focus:border-cyan-500 rounded-full shadow-md hover:shadow-lg transition-shadow duration-200 ease-in-out focus:outline-none"
              disabled // Email is not editable unless the API allows updating it
            />
          </div>

          <div>
            <label className="block text-sm sm:text-base text-gray-700 dark:text-gray-300 mb-1">
              Profile Picture:
            </label>
            <input
              type="file"
              name="avatar"
              accept="image/*"
              className="w-full px-4 py-2 sm:py-3 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-2 border-transparent focus:border-cyan-500 rounded-full shadow-md hover:shadow-lg transition-shadow duration-200 ease-in-out focus:outline-none"
            />
            {userData.avatar && (
              <div className="mt-4">
                <img
                  src={userData.avatar} 
                  alt="Current Avatar"
                  className="w-16 h-16 object-cover rounded-full"
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2 sm:py-3 bg-cyan-500 text-white font-bold rounded-full shadow-lg hover:bg-cyan-600 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:text-gray-200 transition-colors duration-200"
          >
            {isLoading ? 'Saving...' : 'Save Changes'}
          </button>
        </form>

        <ToastContainer />
      </div>
    </div>
  );
};

export default Profile;
