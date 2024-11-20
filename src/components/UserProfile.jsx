import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiProfile } from "../services/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserProfile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("Please login to view your profile");
          navigate("/login");
          return;
        }

        const response = await apiProfile();
        console.log("Full response:", response);
        if (response && response.data) {
          console.log("Profile data:", response.data);
          console.log("Avatar field:", response.data.avatar);
          console.log("Avatar URL constructed:", getProfileImage(response.data.avatar));
          setUserProfile(response.data);
        } else {
          throw new Error("No profile data received");
        }
      } catch (error) {
        console.error("Profile fetch error:", error);
        if (error.response?.status === 401) {
          toast.error("Session expired. Please login again");
          navigate("/login");
        } else {
          toast.error("Failed to fetch profile data");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Date not available";
    }
  };

  const getProfileImage = (avatar) => {
    if (!avatar) return null;
    const cleanPath = avatar.replace('secure/uploads/', '');
    return `https://savefiles.org/secure/uploads/${cleanPath}?shareable_link=524`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="text-center p-6">
        <p className="text-gray-600">No profile data available</p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transform hover:scale-[1.02] transition-all duration-300">
        {/* Avatar Section */}
        <div className="bg-gradient-to-r from-cyan-500 to-cyan-600 p-8 relative overflow-hidden">
          <div className="relative text-center">
            <div className="w-24 h-24 mx-auto rounded-full bg-white p-1 shadow-xl">
              {userProfile.avatar ? (
                <img
                  src={getProfileImage(userProfile.avatar)}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover"
                  onError={(e) => {
                    console.log("Image load error");
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      userProfile.name || 'U'
                    )}&background=0BC5EA&color=fff&size=128`;
                  }}
                />
              ) : (
                <div className="w-full h-full rounded-full bg-gradient-to-r from-cyan-500 to-cyan-600 flex items-center justify-center">
                  <span className="text-3xl text-white font-bold">
                    {userProfile.name?.charAt(0).toUpperCase() ||
                      userProfile.email?.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
            </div>
            <h2 className="mt-4 text-xl font-semibold text-white">
              {userProfile.name || userProfile.email}
            </h2>
            <p className="text-cyan-100 mt-1 text-sm">{userProfile.email}</p>
          </div>
        </div>

        {/* Profile Info */}
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Enrolled Courses
              </p>
              <p className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">
                {userProfile.enrolledCourses?.length || 0}
              </p>
            </div>
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <p className="text-sm text-gray-500 dark:text-gray-400">Joined</p>
              <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                {formatDate(userProfile.createdAt)}
              </p>
            </div>
          </div>

          {/* Edit Profile Button - Updated styling */}
          <div className="flex justify-center mt-8">
            <Link
              to="/edit-profile"
              className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-lg hover:opacity-90 transition-all duration-200 group text-base font-medium"
            >
              <svg
                className="w-5 h-5 mr-2 group-hover:animate-bounce"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
              Edit Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
