import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppLayout } from "./component/AppLayout/AppLayout";
import { ErrorPage } from "./pages/ErrorPage";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Service } from "./pages/Service";
import { AdminUser } from "./pages/Admin/AdminUser";
import { AdminContact } from "./pages/Admin/AdminContact";
import { AdminUpdate } from "./pages/Admin/AdmingUpdate";
import { Register } from "./pages/User-Auth/Register";
import { Login } from "./pages/User-Auth/Login";
import { Logout } from "./pages/User-Auth/Logout";
import { AdminLayout } from "./pages/Admin/AdminLayout";
import { AuthProvider } from "../AuthContextStore";
import "./index.css";
import { ToastContainer } from "react-toastify";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
      { path: "/service", element: <Service /> },
      { path: "/register", element: <Register /> },
      { path: "/login", element: <Login /> },
      { path: "/logout", element: <Logout /> },
      {
        path: "/admin",
        element: <AdminLayout />,
        children: [
          { path: "users", element: <AdminUser /> },
          { path: "contact", element: <AdminContact /> },
          { path: "users/:id/edit", element: <AdminUpdate /> },
        ],
      },
    ],
  },
]);

const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />;
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        bodyClassName="toastBody"
      />
    </AuthProvider>
  );
};

export default App;
