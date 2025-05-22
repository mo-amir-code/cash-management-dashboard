import type { ReactNode } from "react";
import { cn } from "../utils";

type AuthScreenType = {
  children: ReactNode;
  className?: string;
};

const AuthScreen = ({ children, className }: AuthScreenType) => {
  return <div className={cn("max-w-xl rounded-xl w-full min-w-xs border mx-auto border-gray-400/20 p-4", className)}>{children}</div>;
};

export default AuthScreen;
