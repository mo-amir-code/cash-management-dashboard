import { useLocation, useNavigate } from "react-router";
import { navData } from "../../../../utils/data";
import { useEffect, useState } from "react";

const Sidebar = () => {
  const [selectedId, setSelectedId] = useState<number>(0);
  const currentPath = useLocation().pathname;
  const router = useNavigate();

  useEffect(() => {
    const nav = navData.find((na) => na.path === currentPath);
    if (nav) {
      setSelectedId(nav.id);
    }
  }, [currentPath]);

  return (
    <aside className="max-w-[20%] w-full pt-[10%] text-black bg-white">
      <ul className="relative">
        {navData.map(({ name, slug, path }) => (
          <li
            key={slug}
            onClick={() => {
              router(path);
            }}
            className={`font-semibold flex items-center h-[5vh] relative pl-[10%] cursor-pointer text-lg transition-all ease-in-out duration-200 ${
              currentPath === path ? "text-primary" : "opacity-70"
            }`}
          >
            {name}
          </li>
        ))}

        <span
          style={{
            top: (5*selectedId) + "vh",
          }}
          className={`h-[5vh] w-[4vw] rounded-xl absolute -left-[18%] bg-primary transition-all ease-in-out duration-200`}
        />
      </ul>
    </aside>
  );
};

export default Sidebar;
