import { createBrowserRouter, Navigate } from 'react-router-dom';
import MainLayout from '@ui/MainLayout';
import ProjectDetailScreen from '@ui/screens/ProjectDetailScreen';
import ProjectListScreen from '@ui/screens/ProjectListScreen';

export const router = createBrowserRouter([
  {
    path: '/projects',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <ProjectListScreen />,
      },
      {
        path: ':projectName',
        element: <ProjectDetailScreen />,
      },
    ],
  },
  {
    path: '/',
    element: <Navigate to="/projects" />, // Redirect root URL to /projects
  },
  {
    path: '*',
    element: <h1>404: Page Not Found</h1>,
  },
]);
