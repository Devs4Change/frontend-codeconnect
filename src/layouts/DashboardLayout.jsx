import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";




const DashboardLayout = () => {
  return (
    <div className='flex flex-row items-start'>
        <Sidebar/>
        <Outlet/>
    </div>
  );
};

export default DashboardLayout;