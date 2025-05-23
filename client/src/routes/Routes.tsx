import { createBrowserRouter, RouterProvider } from "react-router";
import { AdminLayout, AuthLayout } from "../layout";
import { ForgotPassword, SignInForm, SignUpForm, VerifyOTP } from "../pages/auth";
import { Dashboard } from "../pages/admin";

const Routes = () => {
  const routes = createBrowserRouter([
    {
      path: "/auth",
      element: <AuthLayout />,
      children: [
        {
          path: "signin",
          element: <SignInForm />
        },
        {
          path: "signup",
          element: <SignUpForm />
        },
        {
          path: "forgot-password",
          element: <ForgotPassword />
        },
        {
          path: "verify",
          element: <VerifyOTP />
        },
      ]
    },
    {
      path: "/dashboard",
      element: <AdminLayout />,
      children: [
        {
          path: "",
          element: <Dashboard />
        }
      ]
    },
  ]);

  return <RouterProvider router={routes} />;
};

export default Routes;
