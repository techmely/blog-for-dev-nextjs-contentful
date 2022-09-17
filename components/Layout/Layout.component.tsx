import React, { ReactNode } from "react";
import Footer from "../Footer/Footer.component";
import Style from "./Layout.module.scss";
import TopNav from "../TopNav/TopNav.component";
import ScrollToTop from "../ScrollToTop/ScrollToTop";

type LayoutProps = { children: ReactNode };

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="wrapper">
      <TopNav />
      <div className={Style.wrapper__content}>{children}</div>
      <ScrollToTop/>
      <Footer />
    </div>
  );
}
