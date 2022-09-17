import React, { useState } from "react";
import Style from "./Toc.module.scss";
import { BiListOl } from "react-icons/bi";
import { MdClose } from "react-icons/md";
import {HeadingInfo} from "../../pages/[blog]";
import { useScrollSpy } from "../../hooks/useScrollSpy";

const TOC = ({ content }: { content: HeadingInfo[] }) => {
  const [isActive, setTOC] = useState(false);
  const activeId = useScrollSpy(
    content.map(({ id }) => id),
    { rootMargin: "0% 0% -25% 0%" }
  );

  return (
    <div className={Style["toc-box"]}>
      <button className={Style["button-table"]} onClick={() => { setTOC(!isActive) }}>
        <span className={Style.titleOutside}>Table of contents</span>
        <BiListOl />
      </button>

      <div className={ isActive ? `${Style.tableWrapper} ${Style.active}` : Style.tableWrapper}>
        <div className={Style["tableOfContents"]}>
          <div className={Style["button-close"]}>
            <MdClose onClick={() => { setTOC(!isActive) }} />
          </div>
          <h3 className={Style.title}>TABLE OF CONTENTS</h3>
          <div className={Style.contentsWrapper}>
            <ul className={Style.itemContainer}>
              {
                content.map(({id, text, level}) => (
                  <a href={`#${id}`} key={id}>
                  <li key={id} style={{ marginLeft: `${level - 2}em` }}>
                    <span style={{ fontWeight: activeId === id ? "bold" : "normal"}}>{text}</span>
                  </li>
                  </a>
                ))
              }
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// TODO: Confirm about memo here
export default React.memo(TOC);
