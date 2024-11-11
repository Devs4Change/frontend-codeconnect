// client/src/layouts/DashboardLayout.js
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import axios from "axios";

const DashboardLayout = () => {
  const [profile, setProfile] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // Fetch user profile on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileRes = await axios.get('/users/profile', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });

        setProfile(profileRes.data); // Set profile data
        setIsLoading(false); // Data fetched successfully
      } catch (error) {
        console.error("Error loading profile data", error);
        setIsLoading(false); // Stop loading even if there's an error
      }
    };

    fetchProfile();
  }, []); // Empty dependency array to fetch on mount

  // Loading state
  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="flex flex-row items-start">
      {/* Pass updated profile data to Sidebar */}
      <Sidebar profile={profile} />
      {/* Render child components (like UserDashboard) */}
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
