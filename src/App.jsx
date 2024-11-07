import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css'
import CourseCard from './components/CourseCard';
import HomePage from './pages/HomePage';
import CourseList from './pages/CourseList';
import SignUpForm from './pages/SignUpForm';
import LogInForm from './pages/LogInForm';

function App() {
  const router = createBrowserRouter([
    {
      path:"/",
      element:<HomePage/>,
    },
  {
    path:"/courses",
    element: < CourseCard/>,
  } ,
  {
    path:"/list",
    element:<CourseList/>
  }, 
  {
    path:"/login",
    element:<LogInForm/>
  },
  {
    path:"/signup",
    element:<SignUpForm/>,
  },




  ]);

  return <RouterProvider router={router}/>
}

export default App;
