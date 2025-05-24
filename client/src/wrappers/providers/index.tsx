import type { ReactNode } from "react";
import ContextProvider from "./ContextProvider";
import ReactQueryProvider from "./ReactQueryProvider";
import { Toaster } from "react-hot-toast";

const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <ContextProvider>
      <ReactQueryProvider>
        {children}
        <Toaster position="top-center" />
      </ReactQueryProvider>
    </ContextProvider>
  );
};

export default Provider;
