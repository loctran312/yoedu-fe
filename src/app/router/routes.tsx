import { createBrowserRouter } from 'react-router-dom';

// import AppInit from '../init/AppInit';

import AuthLayout from '../layouts/AuthLayout';

// import MainLayout from '@/app/layouts/MainLayout';

import ProtectedRoute from './ProtectedRoute';
import LoginPage from '@/features/auth/pages/LoginPage';

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
            // element: <RegisterPage />,
          },
        ],
      },
    ],
  },

  /******************** MAIN *********************/
//   {
//     element: <ProtectedRoute />,
//     children: [
//       {
//         path: '/',
//         element: (
//           <AppInit>
//             <MainLayout />
//           </AppInit>
//         ),
//         children: [
//           {
//             index: true,
//             element: <DashboardPage />,
//           },
//           {
//             path: 'profile',
//             element: <UserProfilePage />,
//           },
//           {
//             path: 'students',
//             element: <StudentPage />,
//           },
//           {
//             path: 'teachers',
//             element: <TeacherPage />,
//           },
//           {
//             path: 'courses',
//             element: <CoursePage />,
//           },
//           {
//             path: 'enrollments',
//             element: <EnrollmentPage />,
//           },
//         ],
//       },
//     ],
//   },
]);
