import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom"
import Home from "./Pages/home_page/Home"
import Login from "./Pages/login_page/login"
import Admin from "./Pages/admin_page/admin"

function App() {
  const router = createBrowserRouter([
    // {
    //   path: "/",
    //   element: <Navigate to="/login" replace />
    // },
    {
      path: "/Bakery-Website",
      element: <Login />
    },
    {
      path: "/home",
      element: <Home />
    },
    {
      path: "/admin",
      element: <Admin />
    }
  ], {
    basename: "/Bakery-Website" 
  });
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
