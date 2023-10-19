import { Navigate, useRoutes } from 'react-router-dom'; 
import DashboardLayout from "./layouts/DashboardLayout"; 
import NotFound from "./layouts/NotFound";
import Dashboard from "./dashboard/Dashboard";
import Fetchlist from './fetchList/FetchList';
import Todo from './toDo/ToDo';




const Routes = () => {
    return useRoutes([
      {
        path: "/",
        element: <DashboardLayout />,
        children: [
          { path: "", element: <Dashboard /> },
          { path: "todo", element: <Todo /> },
          { path: "fetchlist", element: <Fetchlist />}
        ],
      },
      { path: "/404", element: <NotFound /> },
      { path: "*", element: <Navigate to="/404" replace /> },
    ]);
  };




export default Routes;

