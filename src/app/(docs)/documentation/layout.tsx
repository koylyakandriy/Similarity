import React, { FC, PropsWithChildren, ReactNode } from "react";

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return <section className="pt-20">{children}</section>;
};

export default Layout;
