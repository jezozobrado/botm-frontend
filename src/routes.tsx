import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Layout from "./components/Layout";
import AllBooks from "./pages/AllBooks";
import HowItWorks from "./pages/HowItWorks";
import Gift from "./pages/Gift";

import Login from "./pages/Login";
import BookDetailPage from "./pages/BookDetailPage";
import NewBooks from "./pages/NewBooks";
import ErrorPage from "./pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/the-best-new-books", element: <NewBooks /> },
      { path: "/all-books", element: <AllBooks /> },
      { path: "/how-it-works", element: <HowItWorks /> },
      { path: "/gifts", element: <Gift /> },
      { path: "/login", element: <Login /> },
      { path: "/all-books/:slug", element: <BookDetailPage /> },
    ],
  },
]);

export default router;
