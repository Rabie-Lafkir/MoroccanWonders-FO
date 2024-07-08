import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage/HomePage.tsx';
import SignInPage from './pages/SignInPage/SignInPage.tsx';
import Layout from './components/Layout/Layout.tsx';
import ContactPage from './pages/ContactPage/ContactPage.tsx';
import LoginPage from './pages/LogInPage/LoginPage.tsx';
import DestinationPage from './pages/DestinationPage/DestinationPage.tsx';
import ItineraryPage from './pages/ItineraryPage/ItineraryPage.tsx';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage.tsx';
import { setAuthData } from './store/authSlice';
import OtpConfirmation from './pages/OtpConfirmation/OtpConfirmation.tsx';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    if (accessToken && refreshToken) {
      // Assume userId and other details can be decoded from the token or fetched from an API
      dispatch(setAuthData({ userId: 'decodedUserId', accessToken, refreshToken }));
    }
  }, [dispatch]);

  const router = createBrowserRouter([
    {
      path: '*',   
      element: <NotFoundPage />,
    },
    {
      path: '/',
      element: <Layout></Layout>,
      children: [
        { path: '/', element: <HomePage /> },
        { path: '/destination', element: <DestinationPage /> },
        { path: '/itinerary', element: <ItineraryPage /> },
        { path: '/contact', element: <ContactPage /> },
        { path: '/signin', element: <SignInPage /> },
        { path: '/login', element: <LoginPage /> },
        { path: '/confirmation', element: <OtpConfirmation /> },
      ],
    },
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
