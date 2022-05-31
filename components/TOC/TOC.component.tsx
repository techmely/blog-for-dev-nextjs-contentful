import React, { useEffect, useState } from "react";
import Style from "./Toc.module.scss";
import { BiNotepad } from "react-icons/bi";
import { MdClose } from "react-icons/md";
import remark from "remark";
import html from "remark-html";

export type TOCProps = string;

export default function TOC({ content }: { content: TOCProps }) {
  const [isActive, setTOC] = useState(false);
  const [tableOfContents, setTableOfContents] = useState(content);

  useEffect(() => {
    remark()
      // .use(prism) error
      .use(html)
      .process(content)
      .then((data) => {
        setTableOfContents(data.toString());
      });
  }, [content]);

  const handleTOC = () => {
    setTOC(!isActive);
  };

  return (
    <div className={Style["toc-box"]}>
      <button className={Style["button-table"]} onClick={handleTOC}>
        <span>Table of contents</span>
        <BiNotepad />
      </button>
      <div
        className={
          isActive
            ? `${Style.tableWrapper} ${Style.active}`
            : Style.tableWrapper
        }
      >
        <div className={Style["tableOfContents"]}>
          <div className={Style["button-close"]}>
            <MdClose onClick={handleTOC} />
          </div>
          <h3 className={Style.title}>TABLE OF CONTENTS</h3>
          <div dangerouslySetInnerHTML={{ __html: tableOfContents }}></div>
        </div>
      </div>
    </div>
  );
}
