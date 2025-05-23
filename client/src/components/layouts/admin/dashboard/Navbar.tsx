import { UserProfile } from "../user";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between p-5 bg-white">
      <h2 className="text-primary text-xl font-semibold">
        Outstanding Report (All Location)
      </h2>
      <UserProfile />
    </div>
  );
};

export default Navbar;
