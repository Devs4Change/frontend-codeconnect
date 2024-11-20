// client/src/pages/Profile.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiEditProfile, apiProfile } from "../services/auth";
import { toast } from "react-toastify";

const EditProfile = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    avatar: null,
  });
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await apiProfile();
        const { name, email } = response.data;
        setFormData((prev) => ({
          ...prev,
          name: name || "",
          email: email || "",
        }));
      } catch (error) {
        console.error("Error fetching profile:", error);
        toast.error("Failed to load profile data");
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        avatar: file,
      }));

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      if (formData.name) formDataToSend.append("name", formData.name);
      if (formData.avatar) formDataToSend.append("avatar", formData.avatar);

      await apiEditProfile(formDataToSend);
      toast.success("Profile updated successfully!");
      navigate("/profile");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
          Edit Profile
        </h2>

        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 shadow-xl rounded-lg px-8 pt-6 pb-8 mb-4">
          {/* Avatar Upload */}
          <div className="mb-6">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
              Profile Picture
            </label>
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 mb-4 relative">
                <img
                  src={
                    previewUrl ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      formData.name || "U"
                    )}&background=0BC5EA&color=fff&size=128`
                  }
                  alt="Profile Preview"
                  className="w-full h-full rounded-full object-cover border-4 border-cyan-500"
                />
                <label className="absolute bottom-0 right-0 bg-cyan-500 rounded-full p-2 cursor-pointer hover:bg-cyan-600 transition-colors">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Name Input */}
          <div className="mb-6">
            <label
              className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white leading-tight focus:outline-none focus:shadow-outline focus:border-cyan-500 dark:bg-gray-700 dark:border-gray-600"
              placeholder="Enter your name"
            />
          </div>

          {/* Email Display (Read-only) */}
          <div className="mb-6">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-500 dark:text-gray-400 leading-tight bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
              disabled
            />
          </div>

          {/* Submit and Cancel Buttons */}
          <div className="flex flex-col space-y-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Updating..." : "Save Changes"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/profile")}
              className="w-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
