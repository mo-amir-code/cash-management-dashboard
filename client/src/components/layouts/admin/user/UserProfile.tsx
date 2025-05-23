import { useCallback, useEffect, useRef, useState } from "react";
import Dropdown from "./Dropdown";

const UserProfile = () => {
  const [isDropdownOpen, setIsDropDownOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleClickEvent = useCallback((event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setIsDropDownOpen(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("click", handleClickEvent);

    return () => {
      window.removeEventListener("click", handleClickEvent);
    };
  }, []);

  return (
    <div className="relative flex items-center justify-center gap-2">
      <div className="w-10 aspect-square overflow-hidden rounded-full bg-yellow-300"></div>

      <div
        onClick={() => setIsDropDownOpen((prev) => !prev)}
        ref={ref}
        className={`w-7 ${
          isDropdownOpen ? "-rotate-90" : ""
        } cursor-pointer smooth-transition active:bg-black/10 rounded-md`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlSpace="preserve"
          id="chevron"
          x="0"
          y="0"
          version="1.1"
          className="fill-red-500 object-cover"
          viewBox="0 0 20 20"
        >
          <path d="M13.418 7.859a.695.695 0 0 1 .978 0 .68.68 0 0 1 0 .969l-3.908 3.83a.697.697 0 0 1-.979 0l-3.908-3.83a.68.68 0 0 1 0-.969.695.695 0 0 1 .978 0L10 11l3.418-3.141z"></path>
        </svg>
      </div>

      <Dropdown isOpen={isDropdownOpen} />
    </div>
  );
};

export default UserProfile;
