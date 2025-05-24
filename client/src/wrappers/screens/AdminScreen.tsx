import type { ReactNode } from "react";
import { cn } from "../../utils";

type AuthScreenType = {
  children: ReactNode;
  className?: string;
};

const AdminScreen = ({ children, className }: AuthScreenType) => {
  return (
    <div className={cn("max-w-7xl w-full p-4 mx-auto", className)}>
      {children}
    </div>
  );
};

export default AdminScreen;
