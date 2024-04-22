import { FC, PropsWithChildren } from "react";
import Navbar from "./Navbar";

const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default MainLayout;
