import Navbar from '@/components/headers/Navbar';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div className=''>
      <Navbar></Navbar>
      <Outlet></Outlet>
    </div>
  );
};

export default MainLayout;