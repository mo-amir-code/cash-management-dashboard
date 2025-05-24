import type { ReactNode } from "react";
import { UserProvider } from "../../context/GlobalContext";

const ContextProvider = ({ children }: { children: ReactNode }) => {
  return <UserProvider>{children}</UserProvider>;
};

export default ContextProvider;
