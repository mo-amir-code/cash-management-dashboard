import { Outlet, useNavigate } from "react-router";
import { useUserDispatch, useUserState } from "../context/GlobalContext";
import { useEffect } from "react";
import Loader from "../components/common/Loader";

const AuthLayout = () => {
  const { isAuthenticated, userInfo, isLoading } = useUserState();
  const router = useNavigate();
  const dispatch = useUserDispatch();

  useEffect(() => {
    if (isAuthenticated || userInfo) {
      dispatch({
        type: "IS_LOADING",
        payload: false,
      });
      router("/dashboard");
      return;
    }
  }, [isAuthenticated, userInfo]);

  return (
    <>
      <main className="h-screen w-screen">
        <div className="flex h-full">
          <div className="flex-1/3 p-4 flex items-center justify-center bg-primary">
            <div className="flex flex-col gap-1 text-white ">
              <h1 className="text-3xl font-semibold">
                Cash Management Dashboard
              </h1>
              <p className="text-lg">
                Real-time Cash Reconciliation – Ensuring Accuracy & Transparency
              </p>
            </div>
          </div>
          <div className="flex-1/5 p-4 flex items-center justify-center bg-white">
            <Outlet />
          </div>
        </div>
      </main>
      {isLoading ? <Loader /> : ""}
    </>
  );
};

export default AuthLayout;
