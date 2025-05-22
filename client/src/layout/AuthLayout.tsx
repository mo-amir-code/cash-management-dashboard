import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <main className="h-screen w-screen">
      <div className="flex h-full">
        <div className="flex-1/3 p-4 flex items-center justify-center bg-primary">
          <div className="flex flex-col gap-1 text-white " >
            <h1 className="text-3xl font-semibold">
              Cash Management Dashboard
            </h1>
            <p className="text-lg" >Real-time Cash Reconciliation – Ensuring Accuracy & Transparency</p>
          </div>
        </div>
        <div className="flex-1/5 p-4 flex items-center justify-center bg-white">
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default AuthLayout;
