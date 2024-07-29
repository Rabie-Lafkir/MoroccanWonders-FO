import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage/HomePage';
import Layout from './components/Layout/Layout';
import ContactPage from './pages/ContactPage/ContactPage';
import LoginPage from './pages/LogInPage/LoginPage';
import DestinationPage from './pages/DestinationPage/DestinationPage';
import ItineraryPage from './pages/ItineraryPage/ItineraryPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import { setAuthData } from './store/authSlice';
import OtpConfirmationPage from './pages/OtpConfirmationPage/OtpConfirmationPage';
import ForgetPasswordPage from './pages/ForgetPasswordPage/ForgetPasswordPage';
import ConfirmResetPasswordPage from './pages/ConfirmResetPasswordPage/ConfirmResetPasswordPage';
import CategoryPage from './pages/CategoryPage/CategoryPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    const user = JSON.parse(localStorage.getItem('user')!);
    if (accessToken && refreshToken && user) {
      dispatch(setAuthData({ user, accessToken, refreshToken }));
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
        { path: '/itinerary', element: <ItineraryPage /> },
        { path: '/category', element: <CategoryPage /> },
        { path: '/contact', element: <ContactPage /> },
        { path: '/signup', element: <SignUpPage /> },
        { path: '/login', element: <LoginPage /> },
        { path: '/confirmation', element: <OtpConfirmationPage /> },
        { path: '/forget-password', element: <ForgetPasswordPage /> },
        { path: '/confirm-reset-password', element: <ConfirmResetPasswordPage /> },
        { path: '/profile', element: <ProfilePage /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
