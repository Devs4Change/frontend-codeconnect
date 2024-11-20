import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css'
import HomePage from './pages/HomePage';
import SignUpForm from './pages/SignUpForm';
import LogInForm from './pages/LoginForm';
import DashboardLayout from './layouts/DashboardLayout';
import CoursesPage from './pages/CoursesPage';
import CourseDetails from './components/CourseDetails';
import UserDashboard from './pages/dashboard/UserDashboard';
import ModulePage from './components/ModulePage';
import EditProfile from './pages/EditProfile';
import UserProfile from './components/UserProfile';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import SettingsPage from './pages/SettingsPage';
import CourseProgress from './components/CourseProgress';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage/>,
    },
    {
      path: "/login",
      element: <LogInForm/>
    },
    {
      path: "/signup",
      element: <SignUpForm/>,
    },
    {
      path: "/courses",
      element: <CoursesPage/>,
    },
    {
      path: "/courses/:courseId",
      element: <CourseDetails/>,
    },
    {
      path: "/about",
      element: <AboutPage />
    },
    {
      path: "/contact",
      element: <ContactPage />
    },
    // Dashboard and protected routes
    {
      path: "/",
      element: <DashboardLayout/>,
      children: [
        {
          path: "dashboard",
          element: <UserDashboard/>
        },
        {
          path: "profile",
          element: <UserProfile/>
        },
        {
          path: "edit-profile",
          element: <EditProfile/>
        },
        {
          path: "settings",
          element: <SettingsPage />
        },
        {
          path: "modules/:courseId",
          element: <ModulePage/>
        },
        {
          path: "course-progress/:courseId",
          element: <CourseProgress/>
        }
      ]
    }
  ]);

  return <RouterProvider router={router}/>;
}

export default App;
