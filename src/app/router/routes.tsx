import { createBrowserRouter } from 'react-router-dom';

import AuthLayout from '../layouts/AuthLayout';

import ProtectedRoute from './ProtectedRoute';
import LoginPage from '@/features/auth/pages/LoginPage';
import RegisterPage from '@/features/auth/pages/RegisterPage';
import MainLayout from '../layouts/MainLayout';
import DashboardPage from '@/features/dashboard/pages/DashboardPage';
import UserPage from '@/features/users/pages/UserPage';

export const router = createBrowserRouter([
  /******************** AUTH *********************/
  {
    element: <ProtectedRoute requireAuth={false} />,
    children: [
      {
        path: '/auth',
        element: <AuthLayout />,
        children: [
          {
            path: 'login',
            element: <LoginPage />,
          },
          {
            path: 'register',
            element: <RegisterPage />,
          },
        ],
      },
    ],
  },

  /******************** MAIN *********************/
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/',
        element: <MainLayout />,
        children: [
          {
            index: true,
            element: <DashboardPage />,
          },
          {
            path: 'accounts',
            element: <UserPage />,
          },
        //   {
        //     path: 'profile',
        //     element: <UserProfilePage />,
        //   },
        //   {
        //     path: 'students',
        //     element: <StudentPage />,
        //   },
        //   {
        //     path: 'teachers',
        //     element: <TeacherPage />,
        //   },
        //   {
        //     path: 'courses',
        //     element: <CoursePage />,
        //   },
        //   {
        //     path: 'enrollments',
        //     element: <EnrollmentPage />,
        //   },
        ],
      },
    ],
  },
]);
