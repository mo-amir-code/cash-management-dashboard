import { useLocation } from "react-router";
import { UserProfile } from "../user";
import { useEffect, useState } from "react";
import { navData } from "../../../../utils/data";

const Navbar = () => {
  const [currentTitle, setCurrentTitle] = useState(navData[0].name);
  const pathname = useLocation().pathname;

  useEffect(() => {
    const currNav = navData.find((n) => n.path === pathname);
    if (currNav) {
      setCurrentTitle(currNav.name);
    }
  }, [setCurrentTitle, pathname]);

  return (
    <div className="flex items-center justify-between p-5 bg-white">
      <h2 className="text-primary text-xl font-semibold">
        {currentTitle} {pathname === "/dashboard" ? "(All Location)" : ""}
      </h2>
      <UserProfile />
    </div>
  );
};

export default Navbar;
