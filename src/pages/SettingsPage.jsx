import React, { useState } from 'react';
import { toast } from 'react-toastify';

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    darkMode: false,
    language: 'english',
    privacy: 'public'
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    toast.success('Setting updated successfully');
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Settings</h1>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 space-y-8">
        {/* Notifications Section */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Notifications</h2>
          <div className="space-y-4">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                name="emailNotifications"
                checked={settings.emailNotifications}
                onChange={handleChange}
                className="form-checkbox h-5 w-5 text-cyan-500"
              />
              <span className="text-gray-700 dark:text-gray-300">Email Notifications</span>
            </label>
          </div>
        </div>

        {/* Appearance Section */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Appearance</h2>
          <div className="space-y-4">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                name="darkMode"
                checked={settings.darkMode}
                onChange={handleChange}
                className="form-checkbox h-5 w-5 text-cyan-500"
              />
              <span className="text-gray-700 dark:text-gray-300">Dark Mode</span>
            </label>
          </div>
        </div>

        {/* Language Section */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Language</h2>
          <select
            name="language"
            value={settings.language}
            onChange={handleChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="english">English</option>
            <option value="french">French</option>
            <option value="spanish">Spanish</option>
          </select>
        </div>

        {/* Privacy Section */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Privacy</h2>
          <select
            name="privacy"
            value={settings.privacy}
            onChange={handleChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="public">Public Profile</option>
            <option value="private">Private Profile</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage; 