import { Outlet } from "react-router";
import AdminScreen from "../screens/AdminScreen";
import { Sidebar } from "../components/layouts/admin";

const AdminLayout = () => {
  return (
    <div className="bg-background">
      <div className="flex w-full h-full">
        <Sidebar />

        <AdminScreen className="overflow-hidden h-screen p-0">
          <main className=" ">

            <Outlet />
          </main>
        </AdminScreen>
      </div>
    </div>
  );
};

export default AdminLayout;
