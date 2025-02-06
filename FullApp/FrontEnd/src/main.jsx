import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { Signup2 } from "./components/Signup2.jsx";
import { Login2 } from "./components/Login2.jsx";
import { Notes } from "./components/Dashboard";
import { CreateNote } from "./components/CreateNote";
import App from "./App.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/register", element: <Signup2 /> },
      { path: "/login", element: <Login2 /> },
      { path: "/createnote", element: <CreateNote /> },
      { path: "/notes", element: <Notes /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
