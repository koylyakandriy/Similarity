import React, { FC, PropsWithChildren } from "react";
import "@/styles/globals.css";

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return <section className="pt-20">{children}</section>;
};

export default Layout;
