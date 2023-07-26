

// project imports
import MainLayout from 'layout/MainLayout';

import HomePage from 'views/home';





// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/home',
      element: <HomePage />
    }
  ]
};

export default MainRoutes;
