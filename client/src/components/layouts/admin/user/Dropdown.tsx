const Dropdown = ({isOpen}:{isOpen:boolean}) => {
  return (
    <div className={`absolute -bottom-[120%] min-w-[150%] select-none right-0 w-full bg-white rounded-md shadow p-2 smooth-transition ${isOpen ? "scale-100" : "scale-0"}`}>
      <ul>
        <li className="text-red-500 ">Log out</li>
      </ul>
    </div>
  );
};

export default Dropdown;
