import { Navigate, useRoutes } from 'react-router-dom'; 
import DashboardLayout from "./layouts/DashboardLayout"; 
import NotFound from "./layouts/NotFound";
import Dashboard from "./dashboard/Dashboard";
import Fetchlist from './documentTable/DocumentTable';
import Todo from './toDo/ToDo';
import DocumentTable from './documentTable/DocumentTable';
import CreateUserForm from './Create';

const Routes = () => {
    return useRoutes([
      {
        path: "/",
        element: <DashboardLayout />,
        children: [
          { path: "", element: <Dashboard /> },
          { path: "todo", element: <Todo /> },
          { path: "document-table", element: <DocumentTable />},
          { path: "create-user-form", element: <CreateUserForm />}
        ],
      },
      { path: "/404", element: <NotFound /> },
      { path: "*", element: <Navigate to="/404" replace /> },
    ]);
  };

export default Routes;


