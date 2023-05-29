import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import Menu from "../pages/Menu/Menu/Menu";
import Order from "../pages/Order/Order/Order";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import DashbordLayout from "../Layout/DashbordLayout";
import Dashboard from "../pages/Dashboard/Dashboard";
import MyCart from "../pages/Dashboard/MyCart/MyCart";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/menu",
        element: <Menu />,
      },
      {
        path: "/order",
        element: <Order />,
      },
    ],
  },
  {
    path: "/dashbord",
    element: <DashbordLayout />,
    children: [
      {
        path: "/dashbord/",
        element: <Dashboard />,
      },
      {
        path: "/dashbord/mycart",
        element: <MyCart />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);
