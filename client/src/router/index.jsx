import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import SearchPage from "../pages/SearchPage";
import Login from "../pages/Login";
import Ragister from "../pages/Ragister";
import ForgotPassword from "../pages/ForgotPassword";
import OtpVerification from "../pages/OtpVerification";
import ResetPassword from "../pages/ResetPassword";
import UserMenuMobile from "../pages/UserMenuMobile";
import Deshboard from "../layout/Deshboard";
import Profile from "../pages/Profile";
import MyOrders from "../pages/MyOrders";
import Address from "../pages/Address";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "search",
        element: <SearchPage />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "ragister",
        element: <Ragister />,
      },
      {
        path:"forgot-password",
        element:<ForgotPassword/>
      },
      {
        path:"otp-verification",
        element:<OtpVerification/>
      },
      {
        path:"reset-password",
        element:<ResetPassword />
      },
      {
        path:"user",
        element:<UserMenuMobile/>
      },
      {
        path : "deshboard",
        element:<Deshboard />,
        children : [
          {
            path:"profile",
            element:<Profile />
          },
          {
            path:"myorders",
            element:<MyOrders />
          },
          {
            path:"address",
            element:<Address/>
          }
        ]
      },
    ],
  },
]);

export default router;
