import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { apiLogin } from "../services/auth";

const LogInForm = () => {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const email = formData.get("email");
    const password = formData.get("password");
    console.log("Form Data:", { email, password });

    try {
      const response = await apiLogin({ email, password });
      console.log("API Response:", response);

      if (response.status === 200) {
        localStorage.setItem("token", response.data.accessToken);
        toast.success("Login successful!", { autoClose: 3000 });

        // Redirect to homepage after a short delay for the toast to show
        setTimeout(() => {
          navigate("/");
        }, 3000); // Adjust delay to allow time for toast notification to display
        
      }
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Login failed. Please try again.", { autoClose: 5000 });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 shadow-2xl rounded-3xl w-full max-w-md mx-4 sm:mx-auto mt-20 mb-10">
        <h2 className="text-2xl text-cyan-600 dark:text-cyan-400 font-bold mb-6 text-center">
          Login
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300">
              Email:
            </label>
            <input
              name="email"
              type="email"
              required
              className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-2 border-transparent focus:border-cyan-500 rounded-full shadow-md hover:shadow-lg transition-shadow duration-200 ease-in-out focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300">
              Password:
            </label>
            <input
              name="password"
              type="password"
              required
              className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-2 border-transparent focus:border-cyan-500 rounded-full shadow-md hover:shadow-lg transition-shadow duration-200 ease-in-out focus:outline-none"
            />
          </div>

          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="w-[200px] py-3 bg-cyan-500 text-white font-bold rounded-full shadow-lg hover:bg-cyan-600 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:text-gray-200"
            >
              Login
            </button>
          </div>
        </form>

        <div className="flex items-center justify-between mt-6">
          <hr className="flex-grow border-gray-300 dark:border-gray-600" />
          <span className="mx-4 text-gray-500 dark:text-gray-400">or</span>
          <hr className="flex-grow border-gray-300 dark:border-gray-600" />
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <Link
              to="/signup"
              className="text-cyan-500 dark:text-cyan-400 hover:underline"
            >
              Create an account
            </Link>
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <Link
              to="/forgot-password"
              className="text-cyan-500 dark:text-cyan-400 hover:underline"
            >
              Forgot password?
            </Link>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LogInForm;
