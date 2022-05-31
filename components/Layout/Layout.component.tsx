import React, { ReactNode, useEffect } from "react";
import Footer from "../Footer/Footer.component";
import Style from "./Layout.module.scss";
import TopNav from "../TopNav/TopNav.component";
import Toc, { TOCProps } from "../TOC/TOC.component";
import Prism from "prismjs";
import "prismjs/components/prism-jsx.min";
import "prismjs/plugins/unescaped-markup/prism-unescaped-markup.min.js";

type LayoutProps = {
  children: ReactNode;
  TOC?: TOCProps;
};

export default function Layout({ children, TOC }: LayoutProps) {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <div className="wrapper">
      {TOC ? <Toc content={TOC} /> : ""}
      <TopNav />
      <div className={Style.wrapper__content}>{children}</div>
      <Footer />
    </div>
  );
}
