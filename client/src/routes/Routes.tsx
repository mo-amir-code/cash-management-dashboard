import { createBrowserRouter, RouterProvider } from "react-router";
import { AdminLayout, AuthLayout } from "../layout";
import {
  ForgotPassword,
  SignInForm,
  SignUpForm,
  VerifyOTP,
} from "../pages/auth";
import { Dashboard } from "../pages/admin";
import ResetPassword from "../pages/auth/ResetPassword";
import { NotFound } from "../pages";
import { useQuery } from "@tanstack/react-query";
import { handleToCheckSession } from "../apis/auth";
import { useUserDispatch } from "../context/GlobalContext";
import { useEffect } from "react";
import Employee from "../pages/admin/Employee";

const Routes = () => {
  const { isSuccess, data } = useQuery({
    queryKey: ["auto-auth"],
    queryFn: handleToCheckSession,
  });
  const dispatch = useUserDispatch();

  useEffect(() => {
    if (isSuccess) {
      dispatch({
        type: "IS_AUTHENTICATED",
        payload: true,
      });
      dispatch({
        type: "USER_INFO",
        payload: data.data,
      });

      return;
    }
  }, [isSuccess, dispatch]);

  const routes = createBrowserRouter([
    {
      path: "/auth",
      element: <AuthLayout />,
      children: [
        {
          path: "signin",
          element: <SignInForm />,
        },
        {
          path: "signup",
          element: <SignUpForm />,
        },
        {
          path: "forgot-password",
          element: <ForgotPassword />,
        },
        {
          path: "reset",
          element: <ResetPassword />,
        },
        {
          path: "verify",
          element: <VerifyOTP />,
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
    {
      path: "/dashboard",
      element: <AdminLayout />,
      children: [
        {
          path: "",
          element: <Dashboard />,
        },
        {
          path: "employee",
          element: <Employee />,
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return <RouterProvider router={routes} />;
};

export default Routes;
