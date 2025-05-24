import { Outlet, useNavigate } from "react-router";
import AdminScreen from "../wrappers/screens/AdminScreen";
import { Navbar, Sidebar } from "../components/layouts/admin/dashboard";
import { BreadCrumbs } from "../components/common";
import { useEffect } from "react";
import { useUserDispatch, useUserState } from "../context/GlobalContext";
import Loader from "../components/common/Loader";

const AdminLayout = () => {
  const { isAuthenticated, userInfo, isLoading } = useUserState();
  const router = useNavigate();
  const dispatch = useUserDispatch();

  useEffect(() => {
    if (!isAuthenticated || !userInfo) {
      dispatch({
        type: "IS_LOADING",
        payload: false,
      });
      router("/auth/signin");
      return;
    }
  }, [isAuthenticated, userInfo]);

  return (
    <>
      <div className="bg-background h-screen overflow-hidden">
        <div className="flex w-full h-full">
          <Sidebar />

          <main className="flex flex-col w-full overflow-hidden gap-4">
            <Navbar />
            <AdminScreen className="flex-1 p-0">
              <div className="h-full">
                <BreadCrumbs />
                <Outlet />
              </div>
            </AdminScreen>
          </main>
        </div>
      </div>
      {isLoading ? <Loader /> : ""}
    </>
  );
};

export default AdminLayout;
