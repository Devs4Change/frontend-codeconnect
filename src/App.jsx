import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css'
import CourseCard from './components/CourseCard';
import HomePage from './pages/HomePage';
import SignUpForm from './pages/SignUpForm';
import LogInForm from './pages/LoginForm';
import Profile from './pages/Profile';
import DashboardLayout from './layouts/DashboardLayout';
import CourseList from './components/CourseList';
import CourseDetails from './components/CourseDetails';
import UserDashboard from './pages/dashboard/UserDashboard';
import ModulePage from './components/ModulePage';


function App() {
  const router = createBrowserRouter([
    {
      path:"/",
      element:<HomePage/>,
    },
  // {
  //   path:"/courses",
  //   element: < CourseCard/>,
  // } ,
  {
    path:"/courses",
    element:<CourseList/>
  }, 
  {
    path:"/courses/:courseId",
    element:<CourseDetails/>,
  },
  {
    path:"/modules/:courseId",
    element: <ModulePage/>,
  },
  {
    path:"/login",
    element:<LogInForm/>
  },
  {
    path:"/signup",
    element:<SignUpForm/>,
  },
  
  {
    path:"/profile",
    element: <Profile/>,
  },
  {
    path:"/dashboard",
    element:<DashboardLayout/>,
    children:[
{
  index: true,
  element: <UserDashboard/>
},



    ]
  }




  ]);

  return <RouterProvider router={router}/>
};

export default App;
