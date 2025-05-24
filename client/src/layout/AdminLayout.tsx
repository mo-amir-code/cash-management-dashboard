import { Outlet, useLocation, useNavigate } from "react-router";
import AdminScreen from "../wrappers/screens/AdminScreen";
import { Navbar, Sidebar } from "../components/layouts/admin/dashboard";
import { BreadCrumbs } from "../components/common";
import { useEffect } from "react";
import { useUserState } from "../context/GlobalContext";

const AdminLayout = () => {
  const { isAuthenticated, userInfo } = useUserState();
  const router = useNavigate();

  useEffect(() => {
    if(!isAuthenticated || !userInfo){
      router("/auth/signin");
      return;
    }
  }, [isAuthenticated, userInfo])

  return (
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
  );
};

export default AdminLayout;
