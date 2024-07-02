import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage/HomePage.tsx";
import SignInPage from "./pages/SignInPage/SignInPage.tsx";
import Layout from "./components/Layout/Layout.tsx";
import ContactPage from "./pages/ContactPage/ContactPage.tsx";
import LoginPage from "./pages/LogInPage/LoginPage.tsx";
import DestinationPage from "./pages/DestinationPage/DestinationPage.tsx";
import ItineraryPage from "./pages/ItineraryPage/ItineraryPage.tsx";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage.tsx";
import { Provider } from "react-redux";
import store from "./app/store.ts";

function App() {
  const router = createBrowserRouter([
    {
      path : "*",   
      element: <NotFoundPage />,
    },
    {
      path: "/",
      element: <Layout></Layout>,
      children: [
        {
          path: "/",
          element: (
              <HomePage />
          ),
        },
        {
          path: "/destination",
          element: <DestinationPage />,
        },
        {
          path: "/itinerary",
          element: <ItineraryPage />,
        },
        {
          path: "/contact",
          element: <ContactPage />,
        },
        {
          path: "/signin",
          element: <SignInPage />,
        },
        {
          path: "/login",
          element: <LoginPage />,
        },
      ],
    },
  ]);
  return (
    <>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </>
  );
}

export default App;
