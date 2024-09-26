import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage/HomePage';
import Layout from './components/Layout/Layout';
import ContactPage from './pages/ContactPage/ContactPage';
import LoginPage from './pages/LogInPage/LoginPage';
import DestinationPage from './pages/DestinationPage/DestinationPage';
import ItineraryPage from './pages/ItineraryPage/ItineraryPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import { setAuthData, updateUser } from './store/authSlice';
import OtpConfirmationPage from './pages/OtpConfirmationPage/OtpConfirmationPage';
import ForgetPasswordPage from './pages/ForgetPasswordPage/ForgetPasswordPage';
import ConfirmResetPasswordPage from './pages/ConfirmResetPasswordPage/ConfirmResetPasswordPage';
import CategoryPage from './pages/CategoryPage/CategoryPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import ProfileDetailsPage from './pages/ProfilePage/ProfileDetailsPage/ProfileDetailsPage';
import DestinationDetailsPage from './pages/DestinationDetailsPage/DestinationDetailsPage';
import ItineraryDetailsPage from './pages/ItineraryDetailsPage/ItineraryDetailsPage';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    const user = JSON.parse(localStorage.getItem('user')!);
    if (accessToken && refreshToken && user) {
      dispatch(setAuthData({ user, accessToken, refreshToken }));
      dispatch(updateUser(user));
    }
  }, [dispatch]);

  const router = createBrowserRouter([
    {
      path: '*',
      element: <NotFoundPage />,
    },
    {
      path: '/',
      element: <Layout />,
      children: [
        { path: '/', element: <HomePage /> },
        { path: '/destination', element: <DestinationPage /> },
        { path: '/destination/:id', element: <DestinationDetailsPage /> }, // Added this route
        { path: '/itinerary', element: <ItineraryPage /> },
        { path: '/itinerary/:id', element: <ItineraryDetailsPage /> },
        { path: '/category', element: <CategoryPage /> },
        { path: '/contact', element: <ContactPage /> },
        { path: '/signup', element: <SignUpPage /> },
        { path: '/login', element: <LoginPage /> },
        { path: '/confirmation', element: <OtpConfirmationPage /> },
        { path: '/forget-password', element: <ForgetPasswordPage /> },
        { path: '/confirm-reset-password', element: <ConfirmResetPasswordPage /> },
        {
          path: '/profile',
          element: <ProfilePage />,
          children: [
            { path: '', element: <Navigate to="details" replace /> },
            { path: 'details', element: <ProfileDetailsPage />, index: true },
            { path: 'task', element: <div /> },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
