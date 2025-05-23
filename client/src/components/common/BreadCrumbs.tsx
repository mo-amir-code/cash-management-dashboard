import { useCallback } from "react";
import { Link, useLocation } from "react-router";
import { navData } from "../../utils/data";

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(Boolean);

  const getName = useCallback((currentPath:string) => {
    return navData.find((na) => na.path === currentPath)?.name || ""
  }, []);

  return (
    <nav style={{ margin: "16px 0" }} className="text-foreground-black">
      {!location.pathname.includes("dashboard") ? (
        <Link to="/">Home</Link>
      ) : (
        <Link to="/dashboard">Dashboard</Link>
      )}
      {pathnames.map((_name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;
        return (
          <span key={routeTo} className="font-semibold text-foreground-black" >
            {" / "}
            {isLast ? (
              <span>{getName(location.pathname)}</span>
            ) : (
              <Link to={routeTo} className="opacity-60" >{getName(location.pathname)}</Link>
            )}
          </span>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;
