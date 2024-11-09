import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Profile = () => {
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // Fetch current user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('https://code-connect-api.onrender.com/users/profile', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setUserData(response.data);
        setIsLoading(false);
      } catch (error) {
        toast.error("Error fetching user data");
        console.error("Error fetching user data", error);
      }
    };

    fetchUserData();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object from the form itself
    const formData = new FormData(e.target);
    
    try {
      const response = await axios.put(
        'https://code-connect-api.onrender.com/users/updateProfile',
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      setUserData(response.data); // Update with new data from the response
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile", error);
      toast.error("Error updating profile. Please try again.");
    }
  };

  if (isLoading) return <p className="text-center text-gray-500">Loading profile...</p>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 shadow-2xl rounded-3xl w-full max-w-md mx-4 sm:mx-auto mt-20 mb-10">
        <h2 className="text-2xl text-cyan-600 dark:text-cyan-400 font-bold mb-6 text-center">
          Update Profile
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 dark:text-gray-300">Name:</label>
            <input
              type="text"
              name="name"
              defaultValue={userData.name}
              className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-2 border-transparent focus:border-cyan-500 rounded-full shadow-md hover:shadow-lg transition-shadow duration-200 ease-in-out focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300">Email:</label>
            <input
              type="email"
              name="email"
              defaultValue={userData.email}
              className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-2 border-transparent focus:border-cyan-500 rounded-full shadow-md hover:shadow-lg transition-shadow duration-200 ease-in-out focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300">Profile Picture:</label>
            <input
              type="file"
              name="profilePicture"
              accept="image/*"
              className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-2 border-transparent focus:border-cyan-500 rounded-full shadow-md hover:shadow-lg transition-shadow duration-200 ease-in-out focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-cyan-500 text-white font-bold rounded-full shadow-lg hover:bg-cyan-600 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:text-gray-200"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
