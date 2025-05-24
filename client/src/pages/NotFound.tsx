import { useNavigate } from "react-router";

const NotFound = () => {
  const router = useNavigate();

  return (
    <div className="h-screen w-screen bg-white text-foreground-black flex flex-col items-center justify-center">
      <h1 className="text-4xl text-center text-red-500">404</h1>
      <p className="text-2xl text-center">Page Not Found!</p>
      <button className=" text-blue-700 underline cursor-pointer" onClick={() => router("/dashboard")}>
        Go Home
      </button>
    </div>
  );
};

export default NotFound;
